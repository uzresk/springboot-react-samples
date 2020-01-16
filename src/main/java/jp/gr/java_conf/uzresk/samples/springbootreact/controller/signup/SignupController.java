package jp.gr.java_conf.uzresk.samples.springbootreact.controller.signup;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
public class SignupController {

    @PostMapping(value = "/api/signup")
    public void signup(@RequestBody SignupForm signupForm) {
        log.info(signupForm.toString());
    }
}
