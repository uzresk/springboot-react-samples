package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private static final List<GrantedAuthority> AUTH_USER
            = AuthorityUtils.createAuthorityList("ROLE_USER");
    private static final List<GrantedAuthority> AUTH_ADMIN
            = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        log.info("loadByUsername:" + username);
        User user = UserDataRepository.find(username);

        // usernameがadminだったら無条件でADMINロールにする
        List<GrantedAuthority> auth = AUTH_USER;
        if (username.equals("admin")) {
            auth = AUTH_ADMIN;
        }

        return new UserDetails(username, user.getPassword(), auth);
    }

}
