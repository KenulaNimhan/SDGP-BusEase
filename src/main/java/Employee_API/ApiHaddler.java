package Employee_API;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import core.util.jsonHandler;
import org.springframework.web.bind.annotation.*;
import services.organization.personell.Employee;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("employee")
public class ApiHaddler {

    @GetMapping("{employeeAPI}") // Ensure correct URL mapping
    public Employee getEmployeeDetails(String employeeAPI) throws IOException {
        List<Employee> employees = loadEmployeesFromJson();

        Optional<Employee> employee = employees.stream()
                .filter(emp -> emp.getEmployeeID().equals(employeeAPI))//Assuming getId() exists
                .findFirst();

        return employee.orElseGet(null);// Return null if not found (consider better error handling)
    }

    // API to add a new employee
    @PostMapping("/add")
    public String addEmployee(@RequestBody Employee newEmployee){
        if (!isValidEmployee(newEmployee)){
            return "Invalid employee details!";
        }

        Employee emp = new Employee(
                newEmployee.getFirstName(),
                newEmployee.getLastName(),
                newEmployee.getNIC(),
                newEmployee.getDateOfBirth()
        );

        jsonHandler.saveEmployeeData(); // save updated employee list
        return "Employee added successfully with ID: " + emp.getEmployeeID();

    }

    private List<Employee> loadEmployeesFromJson() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("employeeData.json")){

            if (inputStream == null){
                throw new RuntimeException("employeeData.json not found");
            }
            return objectMapper.readValue(inputStream, new TypeReference<List<Employee>>() {});
        }catch (IOException e){
            throw new RuntimeException("Error reading JSON file", e);
        }
    }

    private boolean isValidEmployee(Employee emp){
        return emp.getFirstName() != null && emp.getFirstName().matches("[a-zA-Z]+") &&
                emp.getLastName() != null && emp.getLastName().matches("[a-zA-Z]+") &&
                emp.getNIC() != null && emp.getNIC().matches("\\d{9}[Vv]|\\d{12}") &&
                emp.getDateOfBirth() != null && isValidDate(emp.getDateOfBirth());
    }

    private boolean isValidDate(String date){
        try{
            return date.matches("\\d{4}-\\d{2}-\\d{2}");
        }catch (Exception e) {
            return false;
        }
    }

}

