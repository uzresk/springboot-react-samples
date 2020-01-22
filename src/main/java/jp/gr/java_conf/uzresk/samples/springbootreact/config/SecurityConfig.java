package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // JSON Authentication
        RestAuthenticationFilter filter = new RestAuthenticationFilter(authenticationManager());
        http.addFilterAt(filter, RestAuthenticationFilter.class);
        // Spring Securityデフォルトでは、アクセス権限（ROLE）設定したページに未認証状態でアクセスすると403を返すので、401を返すように変更
        http.exceptionHandling().authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
        // 今回は、403エラー時にHTTP Bodyを返さないように設定
        http.exceptionHandling().accessDeniedHandler((req, res, ex) -> res.setStatus(HttpServletResponse.SC_FORBIDDEN));

        http.authorizeRequests()
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
                .anyRequest().authenticated();
//                .antMatchers("/api/user/top").hasAnyRole("USER")
//                .antMatchers("/api/admin/top").hasAnyRole("ADMIN")
//        http.formLogin()
//                .loginPage("/")
//                .loginProcessingUrl("/api/signin")
//                .defaultSuccessUrl("/top", false)
//                .failureUrl("/?error=true");
        http.logout()
                .logoutUrl("/logout")
                .logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK))
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true);

        // TODO CORS
        http.csrf()
                .disable()
                .cors()
                .configurationSource(corsConfigurationSource());
    }

    private CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedMethod(CorsConfiguration.ALL);
        corsConfiguration.addAllowedHeader(CorsConfiguration.ALL);
        corsConfiguration.setAllowCredentials(true);

        corsConfiguration.addAllowedOrigin("http://localhost:3000");

        UrlBasedCorsConfigurationSource corsSource = new UrlBasedCorsConfigurationSource();
        corsSource.registerCorsConfiguration("/**", corsConfiguration);

        return corsSource;
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
