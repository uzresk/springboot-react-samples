package jp.gr.java_conf.uzresk.samples.springbootreact.config;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class UserDataRepository {

    private static List<User> userList = new ArrayList<>();

    static {
        create("user", "$2a$10$5DF/j5hHnbeHyh85/0Bdzu1HV1KyJKZRt2GhpsfzQ8387A/9duSuq");
        create("admin", "$2a$10$5DF/j5hHnbeHyh85/0Bdzu1HV1KyJKZRt2GhpsfzQ8387A/9duSuq");
    }

    public static void create(String userId, String password) {
        userList.add(new User(userId, password));
    }

    public static User find(String username) throws UsernameNotFoundException {
        return userList.stream()
                .filter(u -> u.getUserId().equals(username))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException(username));

    }

}
