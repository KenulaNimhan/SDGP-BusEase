package core.organization.models;


public class Employee {

    // INITIALIZING INSTANCE VARIABLES
    private String employeeID;
    private String firstName;
    private String lastName;
    private String nic;
    private String dateOfBirth;
    private String role;

    // INITIALIZING STATIC VARIABLES
//    private static List<Employee> employeeList = new ArrayList<>();

    public Employee(){};
    public Employee(String fName, String lName, String nic) {
        this.firstName = fName;
        this.lastName = lName;
        this.nic = nic;
    }
    public Employee(String fName, String lName, String nic, String dateOfBirth, String role) {
        this.firstName = fName;
        this.lastName  = lName;
        this.nic = nic;
        this.dateOfBirth = dateOfBirth;
        this.role = role;
    }

    // GETTER METHODS

    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public String getEmployeeID() {
        return employeeID;
    }
    public String getNic() {
        return nic;
    }
    public String getDateOfBirth() {
        return dateOfBirth;
    }
    public String getRole() {
        return role;
    }

    // SETTER METHODS

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }
    public void setNic(String nic) {
        this.nic = nic;
    }
    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    public void setRole(String role) {
        this.role = role;
    }

    // OTHER METHODS
    public String toString() {
        return String.format("""
                Name : %s %s
                EmpID: %s
                nic  : %s
                DOB  : %s
                Role : %s
                ---------
                """, this.firstName, this.lastName, this.employeeID, this.nic, this.dateOfBirth,
                this.role);
    }

}
