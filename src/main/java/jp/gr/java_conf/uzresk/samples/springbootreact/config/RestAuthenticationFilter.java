package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jp.gr.java_conf.uzresk.samples.springbootreact.controller.signin.SigninForm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class RestAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public RestAuthenticationFilter(AuthenticationManager authenticationManager) {
        super();
        // "/api/siginin"
        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/signin", "POST"));
        // ログイン用のID/PWの設定
        setUsernameParameter("userId");
        setPasswordParameter("password");
        setAuthenticationManager(authenticationManager);
        // ログイン後のリダイレクトを止める
        setAuthenticationSuccessHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK));
        // ログイン失敗後のリダイレクトを止める
        setAuthenticationFailureHandler((req, res, ex) -> res.setStatus(HttpServletResponse.SC_UNAUTHORIZED));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {
        try {
            SigninForm signinForm
                    = new ObjectMapper().readValue(request.getInputStream(), SigninForm.class);
            log.info("Authentication:" + signinForm.toString());
            return getAuthenticationManager().authenticate(
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
}
