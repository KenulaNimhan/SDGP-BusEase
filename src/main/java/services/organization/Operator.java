package services.organization;

import java.util.ArrayList;
import java.util.Scanner;
import core.util.Logger;
import services.organization.personell.Employee;

import java.util.List;
import java.time.LocalDate;

public class Operator {
    // INITIALIZING SCANNER
    private static final Scanner scan = new Scanner(System.in);

    // OPERATOR ATTRIBUTES
    private String userName;
    private String password;

    private static List<Operator> opsList = new ArrayList<>();

    // CONSTRUCTORS
    public Operator(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    // SETTER METHODS
    public void setUserName(String username) {
        this.userName = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    // GETTER METHODS
    public String getUserName() {
        return userName;
    }
    public String getPassword() {
        return password;
    }

    // GETTER STATIC METHODS
    public static List<Operator> getOpsList() {
        return opsList;
    }

    // FUNCTIONAL METHODS

    public void createEmp() {
        System.out.println("enter first name: ");
        String fName = scan.next();
        System.out.println("enter last name; ");
        String lName = scan.next();
        new Employee(fName, lName);
        System.out.println("new employee created successfully");
    }

    public void viewEmployees() {
        if(Employee.getEmployeeList().isEmpty()){
            System.out.println("employee list is empty");
        } else {
            System.out.println("--list of employees--");
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
            Bus.getBusList().add(new Bus(vehicleNo));
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
            Logger.log("user added bus "+vehicleNo);
        }
        return isValid;
    }

    // STATIC VALIDATOR METHODS
    public static boolean isValidOperator(String userName, String password) {
        boolean isValid = false;
        for(Operator ops: opsList){
            if (ops.getUserName().matches(userName) && ops.getPassword().matches(password)) {
                isValid = true;
                break;
            }
        }
        return isValid;
    }
}
