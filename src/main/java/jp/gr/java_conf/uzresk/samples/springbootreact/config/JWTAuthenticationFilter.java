package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jp.gr.java_conf.uzresk.samples.springbootreact.controller.signin.SigninForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

import static jp.gr.java_conf.uzresk.samples.springbootreact.config.SecurityConfig.*;

@Slf4j
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
//                                   BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.authenticationManager = authenticationManager;
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        // "/api/siginin"
        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/signin", "POST"));
        // ログイン用のID/PWの設定
        setUsernameParameter("userId");
        setPasswordParameter("password");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        try {
            SigninForm signinForm
                    = new ObjectMapper().readValue(request.getInputStream(), SigninForm.class);
            log.info("Authentication:" + signinForm.toString());
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signinForm.getUserId(),
                            signinForm.getPassword()
                    )
            );
        } catch (IOException e) {
            log.error(e.getMessage());
            throw new RuntimeException(e);
        }
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication auth) {
        // jwtを返却 Authorization: Bearer <token>
        User user = (User) auth.getPrincipal();
        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .claim(CLAIM_ROLE, user.getAuthorities())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }
}
