package jp.gr.java_conf.uzresk.samples.springbootreact.controller.top;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
public class TopController {

    @GetMapping(value = "/api/user/top")
    public String userTop() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (String) (authentication.getPrincipal());
        return "user: " + username + " role: " + authentication.getAuthorities();
    }

    @GetMapping(value = "/api/admin/top")
    public String adminTop() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (String) (authentication.getPrincipal());
        return "user: " + username + " role: " + authentication.getAuthorities();
    }
}
