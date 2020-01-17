package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    private String userId;
    private String password;
}
