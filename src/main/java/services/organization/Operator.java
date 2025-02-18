package services.organization;

import java.sql.Date;
import java.time.DateTimeException;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Scanner;
import core.util.Logger;
import core.util.jsonHandler;
import services.organization.personell.Employee;

import java.util.List;
import java.time.LocalDate;

public class Operator {
    // INITIALIZING SCANNER
    private static final Scanner scan = new Scanner(System.in);

    // OPERATOR ATTRIBUTES
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String userRole;

    private static final String[] userRoles = {"superAdmin", "  secondaryAdmin", "tertiaryAdmin"};

    private static List<Operator> opsList = new ArrayList<>();

    // CONSTRUCTORS
    public Operator() {};
    public Operator(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // SETTER METHODS
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    // GETTER METHODS
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }

    // GETTER STATIC METHODS
    public static List<Operator> getOpsList() {
        return opsList;
    }

    // FUNCTIONAL METHODS

    /**
     * creates an employee object
     *
     * @return
     */
    public boolean createEmp() {

        String fName;
        String lName;
        String NIC;
        String dateOfBirth = "";

        while (true){

            System.out.println("Enter first name: ");
            fName = scan.next();

            if (fName.matches(".*\\d.*")){
                System.out.println(" Invalid input! First name should not contain numbers. Please input again.");
            }
            else {
                break;
            }

        }

        while (true){
            System.out.println("Enter last name: ");
            lName = scan.next();
            if(lName.matches(".*\\d.*")){
                System.out.println(" Invalid input! Last name should not contain numbers. Please input again.");
            }
            else {
                break;
            }
        }

        while(true){
            System.out.println("enter date of birth: ");
            dateOfBirth = scan.next();
            if (isValidDate(dateOfBirth)) {
                break;
            }
            else {
                System.out.println("Invalid date format! Please enter in yyyy-MM-dd format. example: (1111-01-10 )");
            }
        }

        while(true){
            System.out.println("enter NIC: ");
            NIC = scan.next();
            if (NIC.matches("\\d{10}")|| NIC.matches("\\d{12}")) {
                break;
            }
            else {
                System.out.println(" Invalid NIC! NIC must be 10 or 12 numeric digits. Please input again.");
            }
        }

        Employee emp = new Employee(fName, lName, NIC, dateOfBirth);
        Logger.log(this.username+" created EMP;\n"+emp+"\n");
        jsonHandler.saveEmployeeData();
        System.out.println("new employee created successfully");

        return true;
    }

    /**
     *
     * Validates if the given date is in YYYY-MM-dd format.
     */
    private boolean isValidDate(String date){
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate.parse(date, formatter);
            return true;
        }
        catch (DateTimeException e) {
            return false;
        }
    }


    /**
     * views the current list of employees
     */
    public void viewEmployees() {
        if(Employee.getEmployeeList().isEmpty()){
            System.out.println("employee list is empty");
        } else {
            System.out.println("--list of employees--");
            System.out.println(" ");
            for(Employee emp: Employee.getEmployeeList()){
                System.out.println(emp);
            }
        }
    }

    /**
     * shows the list of busses in the system.
     */
    public void viewBusList() {
        if(Bus.getBusList().isEmpty()){
            System.out.println("bus list is empty");
        } else {
            System.out.println("--list of busses--");
            for(Bus bus: Bus.getBusList()){
                System.out.println(bus);
            }
        }
    }

    public void viewBusList(String busRoute) {}

    /**
     * creates a new bus object and adds it into bus list.
     */
    public void addBus() {
        // Vehicle number input loop
        String vehicleNo = "";
        while (true) {
            System.out.println("Enter vehicle number in format [AA-####]: ");
            vehicleNo = scan.next();

            if (isValidVehicleNumber(vehicleNo)) {
                break;  // Exit loop when vehicle number is valid
            } else {
                System.out.println("Error: Invalid vehicle number. Please try again.");
            }
        }

        // Bus model input (this does not require validation, just collect input)
        System.out.println("Enter bus model: ");
        String model = scan.next();

        // Seat capacity input loop
        String capacityInput = "";
        while (true) {
            System.out.println("Enter seating capacity [1-50]: ");
            capacityInput = scan.next();  // Read as String for validation

            if (isValidSeatCapacity(capacityInput)) {
                break;  // Exit loop when seating capacity is valid
            } else {
                System.out.println("Error: Invalid seating capacity. Please try again.");
            }
        }
        int capacity = Integer.parseInt(capacityInput); // Convert the valid input to integer

        // Route code input loop
        String routeCode = "";
        while (true) {
            System.out.println("Enter route code: ");
            routeCode = scan.next();

            // Retrieve the route from the Route class
            Route route = Route.getRouteByCode(routeCode);
            if (route != null) {
                break;  // Exit loop when route is valid
            } else {
                System.out.println("Invalid route code! Please enter a valid route.");
            }
        }

        // After all inputs are validated, create the bus
        Bus bus = new Bus(vehicleNo, model, capacity, Route.getRouteByCode(routeCode));
        Logger.log("User " + this.username + " added bus " + vehicleNo);
        jsonHandler.saveBusData();
        System.out.println("Vehicle added successfully.");
    }



    /**
     * changes the last service date of a bus.
     * @param bus Bus instance.
     * @param date service date.
     */
    public void changeServiceDate(Bus bus, LocalDate date) {
        if (date.isBefore(LocalDate.now())) {
            bus.setLastServiceDate(date);
        } else {
            System.out.println("date invalid.");
        }
    }

    public void changeUsername() {
        System.out.print("enter current password: ");
        String psw = scan.next();
        if (!this.password.equals(psw)) {
            System.out.println("current password incorrect");
            return;
        }
        System.out.print("enter new username: ");
        String newUsername = scan.next();
        if (isValidUsername(newUsername)) {
            this.setUsername(newUsername);
            System.out.println("username changed successfully");
            jsonHandler.saveOperatorData(this);
        } else {
            System.out.println("invalid username. please try again");
        }

    }

    public void changePassword() {
        System.out.print("enter current password: ");
        String psw = scan.next();
        if (!this.password.equals(psw)) {
            System.out.println("current password incorrect");
            return;
        }
        System.out.print("enter new password: ");
        String newPassword = scan.next();
        if (isValidPassword(newPassword)) {
            this.setPassword(newPassword);
            System.out.println("password changed successfully");
            jsonHandler.saveOperatorData(this);
        } else {
            System.out.println("invalid password. please try again");
        }
    }

    // VALIDATOR METHODS

    /**
     * validates the vehicle number.
     * @param vehicleNo license plate number.
     * @return true if valid, false otherwise.
     */
    public boolean isValidVehicleNumber(String vehicleNo) {
        boolean isValid = false;
        String vLetters;
        String vNumbers;
        String vMiddle;
        if (vehicleNo.length()==7){
            vLetters = vehicleNo.substring(0,2);
            vNumbers = vehicleNo.substring(3,7);
            vMiddle  = vehicleNo.substring(2,3);
            if (vLetters.matches("[A-Z]*")
                && vNumbers.matches("[0-9]+")
                && vMiddle.matches("-"))
            {isValid = true;}
        }
        return isValid;
    }
    private boolean isValidSeatCapacity(String input) {
        try {
            int capacity = Integer.parseInt(input);  // Try to parse the input as an integer
            return capacity >= 1 && capacity <= 50;  // Check if it's within the valid range
        } catch (NumberFormatException e) {
            // If the input can't be parsed to an integer
            return false;
        }
    }


    public boolean isValidUsername(String username) {
        return true;
    }

    public boolean isValidPassword(String psw) {
        return true;
    }

    // STATIC VALIDATOR METHODS
    public static boolean isValidOperator(String userName, String password) {
        boolean isValid = false;
        Operator validOps = jsonHandler.loadOperatorData();
        if (validOps != null){
            if (validOps.username.matches(userName) && validOps.password.matches(password)){
                isValid = true;
            }
        }
        /*
        for(Operator ops: opsList){
            if (ops.getUserName().matches(userName) && ops.getPassword().matches(password)) {
                isValid = true;
                break;
            }
        }

         */
        return isValid;
    }

    public static boolean isAuthorised(String currentUserRole, String authorisedUserRole) {
        return currentUserRole.equals(authorisedUserRole);
    }
}
