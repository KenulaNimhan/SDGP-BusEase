package core.organization.models.Test;

import core.organization.models.Employee;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EmployeeTest {

    @Test
    void testEmployeeCreation() {
        Employee emp = new Employee("John", "Doe", "12345678");
        assertEquals("John", emp.getFirstName());
        assertEquals("Doe", emp.getLastName());
        assertEquals("12345678", emp.getNic());
    }

    @Test
    void testRoleAssignment() {
        Employee emp = new Employee("Jane", "Smith", "87654321", "1990-05-15", "Manager");
        assertEquals("Manager", emp.getRole());
    }

    @Test
    void testSettersAndGetters() {
        Employee emp = new Employee();
        emp.setFirstName("Alice");
        emp.setLastName("Brown");
        emp.setNic("99999999");
        emp.setRole("HR");

        assertEquals("Alice", emp.getFirstName());
        assertEquals("Brown", emp.getLastName());
        assertEquals("99999999", emp.getNic());
        assertEquals("HR", emp.getRole());
    }
}
