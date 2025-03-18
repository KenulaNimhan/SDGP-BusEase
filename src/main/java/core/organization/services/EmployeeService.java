package core.organization.services;

import core.organization.models.Employee;
import core.util.DatabaseConnector;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Service
public class EmployeeService {
    // INITIALIZING DATABASE CONNECTOR
    private static final DatabaseConnector dbConnect = new DatabaseConnector();

    public ArrayList<Employee> getEmployeeList() {
        return dbConnect.getEmpDataFromDB();
    }

    public String addNewEmp(Employee emp) {
        try {
            emp.setEmployeeID(createEmpID());
            if (
                    isValidName(emp.getFirstName())
                    && isValidName(emp.getLastName())
                    && isValidNIC(emp.getNic())
                    && isValidYear(emp.getDateOfBirth())
            ) {
                return dbConnect.addEmployeeToDB(emp);
            } else {
                return "INVALID-DATA";
            }
        } catch (Exception e) {
            return "ERROR";
        }
    }

    private String createEmpID() {
        int currentEmpCount = dbConnect.getEmpCount();
        int newEmpCount = currentEmpCount+1;
        return "EM-"+newEmpCount;
    }

    // VALIDATOR METHODS
    /**
     * Validates that the given name contains only letters (no numbers or special characters).
     * @param name the input name
     * @return true if valid, false otherwise
     */
    private boolean isValidName(String name){
        return name.matches("[a-zA-Z]+");
    }

    /**
     * Validates if the given date is in YYYY-MM-dd format.
     * @param date the input date
     * @return true id valid, false otherwise
     */
    private boolean isValidYear(String date){
        try{
            LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            int year = parsedDate.getYear();
            return year >= 1920 && year <= 3000;
        }
        catch (DateTimeException e) {
            return false;
        }
    }

    /**
     * Validates NIC (National Identity Card) number format.
     * Acceptable formats:
     * -9 digits followed by 'V' or 'v' (eg: 123456789V)
     * -12-digit number (eg:200512345678)
     * @param nic the input NIC
     * @return true if valid, false otherwise
     */
    private boolean isValidNIC(String nic){
        return nic.matches("\\d{9}[Vv]") || nic.matches("\\d{12}");
    }
}
