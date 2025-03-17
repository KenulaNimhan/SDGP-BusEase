package core.organization.models;

import java.util.ArrayList;
import java.util.List;


public class Employee {

    // INITIALIZING INSTANCE VARIABLES
    private String employeeID;
    private String firstName;
    private String lastName;
    private String NIC;
    private String dateOfBirth;
    private String role;

    // INITIALIZING STATIC VARIABLES
    private static List<Employee> employeeList = new ArrayList<>();

    public Employee(){};
    public Employee(String fName, String lName, String NIC, String dateOfBirth) {
        this.firstName = fName;
        this.lastName  = lName;
        this.NIC = NIC;
        this.dateOfBirth = dateOfBirth;
        this.employeeID = "EM-"+(employeeList.size()+1);
        employeeList.add(this);
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
    public String getNIC() {
        return NIC;
    }
    public String getDateOfBirth() {
        return dateOfBirth;
    }

    // GETTER METHODS FOR STATIC VARIABLES
    public static List<Employee> getEmployeeList() {
        return employeeList;
    }

    // SETTER METHODS

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setEmployeeID() {
        this.employeeID = "EM-"+employeeList.size();
    }
    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }
    public void setNIC(String NIC) {
        this.NIC = NIC;
    }
    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    public void setRole(String role) {
        this.role = role;
    }

    // SETTER METHODS FOR STATIC VARIABLES
    public static void setEmployees(ArrayList<Employee> employees){
        employeeList = employees;
    }

    // OTHER METHODS
    public String toString() {
        return String.format("""
                Name : %s %s
                EmpID: %s
                NIC  : %s
                DOB  : %s
                ---------
                """, this.firstName, this.lastName, this.employeeID, this.NIC, this.dateOfBirth);
    }

}
