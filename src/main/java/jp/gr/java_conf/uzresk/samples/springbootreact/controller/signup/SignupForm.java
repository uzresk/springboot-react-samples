package jp.gr.java_conf.uzresk.samples.springbootreact.controller.signup;

import lombok.Data;

import java.io.Serializable;

@Data
public class SignupForm implements Serializable {

    private String userId;

    private String email;

    private String password;

}
