package core.organization.models;

public class Operator {

    // OPERATOR ATTRIBUTES
    private String username;
    private String password;
    private String email;
    private String userRole;

    private static final String[] userRoles = {"superAdmin", "  secondaryAdmin", "tertiaryAdmin"};

    // CONSTRUCTORS
    public Operator() {};
    public Operator(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // SETTER METHODS
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // GETTER METHODS
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
    public String getEmail() {
        return email;
    }

    public static boolean isAuthorised(String currentUserRole, String authorisedUserRole) {
        return currentUserRole.equals(authorisedUserRole);
    }
}
