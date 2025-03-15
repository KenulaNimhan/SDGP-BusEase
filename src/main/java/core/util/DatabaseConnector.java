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

    public void getEmpDataFromDB() {
        try {
            // creating statement
            Statement queryEmpDataStatement = sqlConnection.createStatement();
            ResultSet empDataFromDB = queryEmpDataStatement.executeQuery("SELECT * FROM Employees");

            // checking the availability of data
            if (!empDataFromDB.isBeforeFirst()) {
                System.out.println("No employee data found");
            } else {
                System.out.println("Employee Data;");
                while(empDataFromDB.next()) {
                    System.out.printf("""
                            ----
                            Name : %s %s
                            ID   : %s
                            NIC  : %s
                            """,
                            empDataFromDB.getString("firstName"),
                            empDataFromDB.getString("lastName"),
                            empDataFromDB.getString("employeeID"),
                            empDataFromDB.getString("NIC"));
                }
            }

        } catch (SQLException e) {
            System.out.println("Database error occurred.");
            Logger.log(e);
        }
    }
    public void getBusDataFromDB() {
        try {
            // creating statement
            Statement queryEmpDataStatement = sqlConnection.createStatement();
            ResultSet busDataFromDB = queryEmpDataStatement.executeQuery("SELECT * FROM Buses");

            // checking the availability of data
            if (!busDataFromDB.isBeforeFirst()) {
                System.out.println("No bus data found");
            } else {
                System.out.println("Bus Data;");
                while(busDataFromDB.next()) {
                    System.out.printf("""
                            ----
                            Vehicle No : %s
                            Model      : %s
                            Capacity   : %d
                            Route Code : %s
                            """,
                            busDataFromDB.getString("vehicleNo"),
                            busDataFromDB.getString("model"),
                            busDataFromDB.getInt("capacity"),
                            busDataFromDB.getString("routeCode"));
                }
            }

        } catch (SQLException e) {
            System.out.println("Database error occurred.");
            Logger.log(e);
        }
    }

    public ArrayList<Route> getRouteDataFromDB() {
        //creating result array
        ArrayList<Route> existingRoutes = new ArrayList<>();

        try {
            // creating statement
            Statement queryEmpDataStatement = sqlConnection.createStatement();
            ResultSet routeDataFromDB = queryEmpDataStatement.executeQuery("SELECT * FROM routes");

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

    public void addEmployeeToDB(Employee emp) {
        try{
            // creating an array with employee data
            String[] empData = {emp.getEmployeeID(), emp.getFirstName(), emp.getLastName(), emp.getNIC(), emp.getDateOfBirth()};

            // creating statement
            String statementString = "INSERT INTO Employees (employeeID, firstName, lastName, NIC, DOB) VALUES (?,?,?,?,?)";
            PreparedStatement insertEmpStatement = sqlConnection.prepareStatement(statementString);
            for (int i=0; i<empData.length; i++) {
                insertEmpStatement.setString(i+1, empData[i]);
            }
            insertEmpStatement.execute();
            System.out.println("insertion success");
            // closing statement
            insertEmpStatement.close();
        } catch (SQLException e) {
            System.out.println("Database error occurred");
            Logger.log(e);
        }
    }

    public void addBusToDB(Bus bus) {
        try{
            // creating an array with bus data
            String[] busData = {bus.getVehicleNo(), bus.getModel(), bus.getRoute().getRouteCode()};

            // creating statement
            String statementString = "INSERT INTO Buses (vehicleNo, model, routeCode, capacity) VALUES (?,?,?,?)";
            PreparedStatement insertBusStatement = sqlConnection.prepareStatement(statementString);
            for (int i=0; i<busData.length; i++) {
                insertBusStatement.setString(i+1, busData[i]);
            }
            insertBusStatement.setInt(4, bus.getCapacity());
            insertBusStatement.execute();
            System.out.println("insertion success");
            // closing statement
            insertBusStatement.close();

        } catch (SQLException e) {
            System.out.println("Database error occurred");
            Logger.log(e);
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
