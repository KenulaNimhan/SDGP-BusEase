package services.organization.personell;

import java.util.ArrayList;
import java.util.List;

public class Employee {
    // INITIALIZING INSTANCE VARIABLES
    private String employeeID;
    private String firstName;
    private String lastName;

    // INITIALIZING STATIC VARIABLES
    private static int employeeCount;
    private static final List<Employee> employees = new ArrayList<>();

    public Employee(String fName, String lName) {
        this.firstName = fName;
        this.lastName  = lName;
        this.employeeID = "EM-"+employees.size()+1;
        employees.add(this);
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

    // GETTER METHODS FOR STATIC VARIABLES
    public static List<Employee> getEmployeeList() {
        return employees;
    }

    // SETTER METHODS

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setEmployeeID() {
        this.employeeID = "EM-"+employees.size();
    }

    // OTHER METHODS
    public String toString() {
        return String.format("""
                Name : %s %s
                EmpID: %s
                """, this.firstName, this.lastName, this.employeeID);
    }

}
