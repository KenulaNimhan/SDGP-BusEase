package core.util;

import com.fasterxml.jackson.core.Versioned;
import com.fasterxml.jackson.databind.ObjectMapper;
import services.organization.*;
import services.organization.personell.Employee;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

public class jsonHandler {
    // INITIALIZING OBJECT MAPPER
    private static final ObjectMapper mapper = new ObjectMapper();

    // USED FILES
    private static final File adminDataFile = new File("src/main/resources/adminCred.json");
    private static final File busDataFile = new File("src/main/resources/busData.json");
    private static final File employeeDataFile = new File("src/main/resources/employeeData.json");

    public static Operator loadOperatorData() {
        try{
            return mapper.readValue(adminDataFile, Operator.class);
        } catch (IOException e) {
            Logger.log(e);
            return null;
        }
    }

    public static void loadBusData() {
        try{
            Bus[] buses = mapper.readValue(busDataFile, Bus[].class);
            ArrayList<Bus> busList = new ArrayList<>(Arrays.asList(buses));
            Bus.setBusList(busList);
        } catch (IOException e) {
            Logger.log(e);
            System.out.println("bus data could not be retrieved");
        }
    }

    public static void loadEmployeeData() {
        try{
            Employee[] employees = mapper.readValue(employeeDataFile, Employee[].class);
            ArrayList<Employee> employeeList = new ArrayList<>(Arrays.asList(employees));
            Employee.setEmployees(employeeList);
        } catch (IOException e) {
            Logger.log(e);
            System.out.println("employee data could not be retrieved");
        }
    }

    public static void saveOperatorData(Operator ops) {
        try{
            mapper.writeValue(adminDataFile, ops);
        } catch (IOException e) {
            Logger.log(e);
            System.out.println("new admin data couldn't be saved");
        }
    }

    public static void saveBusData() {
        try{
            mapper.writeValue(busDataFile, Bus.getBusList());
        } catch (IOException e) {
            Logger.log(e);
            System.out.println("bus data file couldn't be saved");
        }
    }

    public static void saveEmployeeData() {
        try{
            mapper.writeValue(employeeDataFile, Employee.getEmployeeList());
        } catch (IOException e) {
            Logger.log(e);
            System.out.println("employee data could not be saved");
        }
    }

}
