package jp.gr.java_conf.uzresk.samples.springbootreact.controller.signin;

import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.Serializable;

@Data
public class SigninForm implements Serializable {

    private String userId;

    private String password;

    public void encrypt(PasswordEncoder encoder) {
        this.password = encoder.encode(password);
    }

}
