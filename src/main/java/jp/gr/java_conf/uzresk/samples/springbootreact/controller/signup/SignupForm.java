package jp.gr.java_conf.uzresk.samples.springbootreact.controller.signup;

import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.Serializable;

@Data
public class SignupForm implements Serializable {

    private String userId;

    private String email;

    private String password;

    public void encrypt(PasswordEncoder encoder) {
        this.password = encoder.encode(password);
    }

}
