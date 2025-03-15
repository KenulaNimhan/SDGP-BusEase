package core.organization.services;

import java.util.Scanner;
import core.organization.models.Bus;
import core.organization.models.Route;
import core.util.DatabaseConnector;
import core.util.Logger;
//import core.util.jsonHandler;

public class BusService {
    // INITIALIZING SCANNER
    private static final Scanner scan = new Scanner(System.in);
    // INITIALIZING DATABASE CONNECTOR
    private static final DatabaseConnector dbConnect = new DatabaseConnector();

    public void addBus() {

    }

    /**
     * creates a new bus object and adds it into bus list.
     */
    /**
    public void addBus() {
        // Vehicle number input loop
        String vehicleNo = "";
        while (true) {
            System.out.println("enter vehicle number in format [AA-####]: ");
            vehicleNo = scan.next();

            if (isValidVehicleNumber(vehicleNo)) {
                break;  // Exit loop when vehicle number is valid
            } else {
                System.out.println("error: invalid vehicle number. please try again.");
            }
        }

        // Bus model input (this does not require validation, just collect input)
        System.out.println("enter bus model: ");
        String model = scan.next();

        // Seat capacity input loop
        String capacityInput = "";
        while (true) {
            System.out.println("enter seating capacity [1-50]: ");
            capacityInput = scan.next();  // Read as String for validation

            if (isValidSeatCapacity(capacityInput)) {
                break;  // Exit loop when seating capacity is valid
            } else {
                System.out.println("error: invalid seating capacity. please try again.");
            }
        }
        int capacity = Integer.parseInt(capacityInput); // Convert the valid input to integer

        // Route code input loop
        String routeCode = "";
        while (true) {
            System.out.println("enter route code: ");
            routeCode = scan.next();

            // Retrieve the route from the Route class
            Route route = Route.getRouteByCode(routeCode);
            if (route != null) {
                break;  // Exit loop when route is valid
            } else {
                System.out.println("invalid route code! please enter a valid route.");
            }
        }

        // After all inputs are validated, create the bus
        Bus bus = new Bus(vehicleNo, model, capacity, Route.getRouteByCode(routeCode));
//        Logger.log("User " + this.username + " added bus " + bus);
        jsonHandler.saveBusData();
        dbConnect.addBusToDB(bus);
        System.out.println("Vehicle added successfully.");
    }
     */

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

    /**
     * checks if the input seat capacity is valid.
     * @param input capacity
     * @return true if valid, false if not.
     */
    private boolean isValidSeatCapacity(String input) {
        try {
            int capacity = Integer.parseInt(input);  // Try to parse the input as an integer
            return capacity >= 1 && capacity <= 50;  // Check if it's within the valid range
        } catch (NumberFormatException e) {
            // If the input can't be parsed to an integer
            return false;
        }
    }

    private boolean isValidRoute(String routeCode) {
        return true;
    }
}
