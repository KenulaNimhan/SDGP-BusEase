package services.organization;

import java.util.Scanner;
import core.util.ExceptionLogger;

public class Operator {
    // INITIALIZING SCANNER
    private static final Scanner scan = new Scanner(System.in);
    // EXCEPTION LOGGER OBJECT TO ENTER LOGS ON ERRORS
    ExceptionLogger excLogger = new ExceptionLogger();

    // OPERATOR ATTRIBUTES
    private String userName;
    private String password;

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

    // OTHER METHODS

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
     * Creates a new bus object and adds it into bus list.
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

    // VALIDATOR METHODS
    public boolean isValidVehicleNumber(String vehicleNo) {
        boolean isValid = false;
        String vLetters;
        String vNumbers;
        String vMiddle;
        if (vehicleNo.length()==7){
            try {
                vLetters = vehicleNo.substring(0,2);
                vNumbers = vehicleNo.substring(3,7);
                vMiddle  = vehicleNo.substring(2,3);
                if (vLetters.matches("[A-Z]*")
                    && vNumbers.matches("[0-9]+")
                    && vMiddle.matches("-"))
                {isValid = true;}
            } catch (StringIndexOutOfBoundsException e) {
                excLogger.writeToFile(e);
            }
        }
        return isValid;
    }
}
