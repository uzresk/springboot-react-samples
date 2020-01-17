package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public static final long EXPIRATION_TIME = 3_600_000; // 1hours
    public static final String SECRET = "springbootreactsecret";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String CLAIM_ROLE = "role";

    private final UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()  // TODO 同じドメイン上でReactを動かせばいらない？
                .and().authorizeRequests()
                .antMatchers(
                        "/",
                        "/public/**",
                        "/**.js",
                        "/**.json",
                        "/**.ico",
                        "/**.png",
                        "/static/**",
                        "/api/signup",
                        "/api/signin").permitAll()
                .antMatchers("/api/user/top").hasAnyRole("USER")
                .antMatchers("/api/admin/top").hasAnyRole("ADMIN")
                .anyRequest().authenticated()
                .and().logout()
                .and().csrf().disable()
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Autowired
    public void configureAuthenticationManagerBuilder(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder());
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
