package core.util;

public class LoginRequest {
    private String userNameOrEmail;
    private String password;

    public LoginRequest() {
    }

    // GETTER METHODS
    public String getUserNameOrEmail() {
        return userNameOrEmail;
    }
    public String getPassword() {
        return password;
    }

    // SETTER METHODS
    public void setUserNameOrEmail(String userNameOrEmail) {
        this.userNameOrEmail = userNameOrEmail;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
