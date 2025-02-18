package services.organization;

import java.sql.Date;
import java.time.DateTimeException;
import java.time.Year;
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

            System.out.println("Enter first name: "); //Getting First Name from User
            fName = scan.next().trim();

            if (isValidName(fName)){ // Validate by using regex method
                break;
            }
            else {
                System.out.println(" Invalid input! First name should not contain numbers or special characters. Please input again.");

            }

        }

        while (true){
            System.out.println("Enter last name: "); //Getting Last Name from User
            lName = scan.next().trim();

            if(isValidName(lName)){ // Validate by using regex method
                break;
            }
            else {
                System.out.println(" Invalid input! Last name should not contain numbers or special characters. Please input again.");

            }
        }

        while(true){
            System.out.println("Enter date of birth (YYYY-MM-dd): "); //Getting Date of Birth from User
            dateOfBirth = scan.next();

            if (isValidYear(dateOfBirth) && isValidYear(dateOfBirth)) { // Validate by using DateTimeFormatter format
                break;
            }
            else {
                System.out.println("Invalid date! Please enter in yyyy-MM-dd format and the year is between 1920 and 3000 . example: (1920-01-20)");
            }
        }

        while(true){
            System.out.println("enter NIC: "); //Getting NIC Number from User
            NIC = scan.next();
            if (isValidNIC(NIC)) { // Validate by using regex method
                break;
            }
            else {
                System.out.println(" Invalid NIC! NIC must be 9 digits followed by 'V' or 'v',  12 numeric digits. Please input again.");
            }
        }

        Employee emp = new Employee(fName, lName, NIC, dateOfBirth);
        Logger.log(this.username+" created EMP;\n"+emp+"\n");
        jsonHandler.saveEmployeeData();
        System.out.println("new employee created successfully");

        return true;
    }

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
                System.out.println(bus.getVehicleNo());
            }
        }
    }

    public void viewBusList(String busRoute) {}

    /**
     * creates a new bus object and adds it into bus list.
     */
    public void addBus() {
        System.out.println("enter vehicle number in format [AA-####]: ");
        String vehicleNo = scan.next();
        // ADDING BUS TO THE LIST OF BUSES
        if (isValidVehicleNumber(vehicleNo)){
            new Bus(vehicleNo);
            Logger.log("user- "+ this.username +" added bus "+vehicleNo);
            jsonHandler.saveBusData();
            System.out.println("vehicle added successfully");
        } else {
            System.out.println("vehicle number not valid");
        }

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
