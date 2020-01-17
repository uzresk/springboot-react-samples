package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import static jp.gr.java_conf.uzresk.samples.springbootreact.config.SecurityConfig.*;

@Slf4j
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

//    private AuthenticationManager authenticationManager;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(HEADER_STRING);
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        // Authorization: Bearer <Token>
        UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        if (token == null) {
            return null;
        }
        token = token.replace(HEADER_STRING, "");
        token = token.replace(TOKEN_PREFIX, "").trim();
        log.info("token: " + token);
        JwtParser parser = Jwts.parser().setSigningKey(SECRET.getBytes());
        Claims claims = parser.parseClaimsJws(token).getBody();
        String user = claims.getSubject();
        if (user == null) {
            return null;
        }
        List grants = (List) claims.get(CLAIM_ROLE);
        String[] arrayRole = new String[grants.size()];
        for (int i = 0; i < grants.size(); i++) {
            Map grant = (Map)grants.get(i);
            String rolestr = (String) grant.get("authority");
            arrayRole[i] = rolestr;
        }
        List<GrantedAuthority> roles = AuthorityUtils.createAuthorityList(arrayRole);
        return new UsernamePasswordAuthenticationToken(user, null, roles);
    }
}
