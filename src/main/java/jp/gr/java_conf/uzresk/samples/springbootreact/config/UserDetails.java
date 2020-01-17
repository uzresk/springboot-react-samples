package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UserDetails extends org.springframework.security.core.userdetails.User {

    UserDetails(String userId, String password, Collection<GrantedAuthority> grantedAuthorities) {
        super(userId, password, grantedAuthorities);
    }
}
