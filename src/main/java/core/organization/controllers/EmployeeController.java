package core.organization.controllers;

import core.organization.models.Employee;
import core.organization.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("employees")
public class EmployeeController {

    @Autowired
    EmployeeService empService;

    @GetMapping("viewAll")
    private ArrayList<Employee> viewEmployeeList() {
        return empService.getEmployeeList();
    }

}
