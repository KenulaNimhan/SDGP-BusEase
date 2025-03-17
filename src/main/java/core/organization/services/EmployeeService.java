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
}
