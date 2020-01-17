package jp.gr.java_conf.uzresk.samples.springbootreact.controller.signup;

import jp.gr.java_conf.uzresk.samples.springbootreact.config.UserDataRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
public class SignupController {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(value = "/api/signup")
    public String signup(@RequestBody SignupForm signupForm) {
        signupForm.encrypt(bCryptPasswordEncoder);
        log.info(signupForm.toString());
        UserDataRepository.create(signupForm.getUserId(), signupForm.getPassword());
        return "success";
    }
}
