package core.util;

import core.organization.models.Employee;
import core.organization.models.Bus;
import core.organization.models.Route;
import java.util.ArrayList;

import java.sql.*;

public class DatabaseConnector {
    private static Connection sqlConnection;

    public DatabaseConnector() {
        try {
            sqlConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/busease", "superAdmin", "super_Admin123");
            System.out.println("connected successfully");
        } catch (SQLException e) {
            System.out.println("connection failed");
            Logger.log(e);
        }
    }

    public ArrayList<Employee> getEmpDataFromDB() {
        // creating result array
        ArrayList<Employee> employeeList = new ArrayList<>();

        try {
            // creating statement
            Statement queryEmpDataStatement = sqlConnection.createStatement();
            ResultSet empDataFromDB = queryEmpDataStatement.executeQuery("SELECT * FROM Employees");

            while(empDataFromDB.next()) {
                Employee emp = new Employee(
                        empDataFromDB.getString("firstName"),
                        empDataFromDB.getString("lastName"),
                        empDataFromDB.getString("NIC")
                );
                Date birthDate = empDataFromDB.getDate("DOB");
                if (birthDate != null) {
                    emp.setDateOfBirth(empDataFromDB.getDate("DOB").toString());
                }
                emp.setEmployeeID(empDataFromDB.getString("employeeID"));
                emp.setRole(empDataFromDB.getString("type"));
                employeeList.add(emp);
            }
            return employeeList;

        } catch (SQLException e) {
            System.out.println("Database error occurred.");
            Logger.log(e);
            return employeeList;
        }
    }
    public ArrayList<Bus> getBusDataFromDB() {
        //creating result array
        ArrayList<Bus> existingBuses = new ArrayList<>();

        try {
            // creating statement
            Statement queryBusDataStatement = sqlConnection.createStatement();
            ResultSet busDataFromDB = queryBusDataStatement.executeQuery("SELECT * FROM Buses");

            while(busDataFromDB.next()) {
                Bus bus = new Bus(
                        busDataFromDB.getString("vehicleNo"),
                        busDataFromDB.getString("model"),
                        busDataFromDB.getInt("capacity"),
                        busDataFromDB.getString("routeCode")
                );
                existingBuses.add(bus);
            }
            return existingBuses;

        } catch (SQLException e) {
            System.out.println("Database error occurred.");
            Logger.log(e);
            return existingBuses;
        }
    }

    public ArrayList<Route> getRouteDataFromDB() {
        //creating result array
        ArrayList<Route> existingRoutes = new ArrayList<>();

        try {
            // creating statement
            Statement queryRouteDataStatement = sqlConnection.createStatement();
            ResultSet routeDataFromDB = queryRouteDataStatement.executeQuery("SELECT * FROM routes");

            while(routeDataFromDB.next()) {
                Route route = new Route(
                        routeDataFromDB.getString("routeCode"),
                        routeDataFromDB.getString("startDestination"),
                        routeDataFromDB.getString("endDestination")
                );
                existingRoutes.add(route);
            }
            return existingRoutes;

        } catch (SQLException e) {
            System.out.println("Database error occurred.");
            Logger.log(e);
            return existingRoutes;
        }
    }

    public int getEmpCount() {
        int empCount = -1;
        try{
            // creating statement
            Statement queryEmployeeCount = sqlConnection.createStatement();
            ResultSet totalEmpRecords = queryEmployeeCount.executeQuery("SELECT COUNT(*) FROM employees");

            if (totalEmpRecords.next()){
                empCount = totalEmpRecords.getInt(1);
            }

        } catch (SQLException e) {
            System.out.println("Database error occurred.");
            Logger.log(e);
        }
        return empCount;
    }

    public String addEmployeeToDB(Employee emp) {
        try{
            // creating an array with employee data
            String[] empData = {emp.getEmployeeID(), emp.getFirstName(), emp.getLastName(), emp.getNic(), emp.getDateOfBirth(), emp.getRole()};

            // creating statement
            String statementString = "INSERT INTO Employees (employeeID, firstName, lastName, NIC, DOB, type) VALUES (?,?,?,?,?,?)";
            PreparedStatement insertEmpStatement = sqlConnection.prepareStatement(statementString);
            for (int i=0; i<empData.length; i++) {
                insertEmpStatement.setString(i+1, empData[i]);
            }
            insertEmpStatement.execute();
            // closing statement
            insertEmpStatement.close();
            return "DB-DONE";
        } catch (SQLException e) {
            Logger.log(e);
            return "DB-ERROR";
        }
    }

    public String addBusToDB(Bus bus) {
        try{
            // creating an array with bus data
            String[] busData = {bus.getVehicleNo(), bus.getModel(), bus.getRoute()};

            // creating statement
            String statementString = "INSERT INTO Buses (vehicleNo, model, routeCode, capacity) VALUES (?,?,?,?)";
            PreparedStatement insertBusStatement = sqlConnection.prepareStatement(statementString);
            for (int i=0; i<busData.length; i++) {
                insertBusStatement.setString(i+1, busData[i]);
            }
            insertBusStatement.setInt(4, bus.getCapacity());
            insertBusStatement.execute();
            // closing statement
            insertBusStatement.close();
            return "DB-DONE";

        } catch (SQLException e) {
            Logger.log(e);
            return "DB-ERROR";
        }
    }

    public String addRouteToDB(Route route) {
        try{
            // creating an array with route data
            String[] routeData = {route.getRouteCode(), route.getStartDestination(), route.getEndDestination()};

            // creating statement
            String statementString = "INSERT INTO routes (routeCode, startDestination, endDestination) VALUES (?,?,?)";
            PreparedStatement insertRouteStatement = sqlConnection.prepareStatement(statementString);
            for (int i=0; i<routeData.length; i++) {
                insertRouteStatement.setString(i+1, routeData[i]);
            }
            insertRouteStatement.execute();
            // closing statement
            insertRouteStatement.close();
            return "DB-DONE";

        } catch (SQLException e) {
            Logger.log(e);
            return "DB-ERROR";

        }
    }
}
