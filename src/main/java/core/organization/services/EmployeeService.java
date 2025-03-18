package core.organization.services;

import core.organization.models.Employee;
import core.util.DatabaseConnector;
import org.springframework.stereotype.Service;

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
            return dbConnect.addEmployeeToDB(emp);
        } catch (Exception e) {
            return "ERROR";
        }
    }

    private String createEmpID() {
        int currentEmpCount = dbConnect.getEmpCount();
        int newEmpCount = currentEmpCount+1;
        return "EM-"+newEmpCount;
    }
}
