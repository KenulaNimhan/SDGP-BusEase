package core.organization.services;

import core.organization.models.Bus;
import core.organization.models.Route;
import core.util.DatabaseConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class BusService {
    // INITIALIZING DATABASE CONNECTOR
    @Autowired
    private final DatabaseConnector dbConnect;

    public BusService(DatabaseConnector dbConnect) {
        this.dbConnect = dbConnect;
    }

    public String addBus(Bus bus) {
        String response = null;
        if (
                isValidVehicleNumber(bus.getVehicleNo())
                && isValidSeatCapacity(bus.getCapacity())
                && isValidRoute(bus.getRoute())
        ) {
            response = dbConnect.addBusToDB(bus);
        }
        else {
            response = "invalid-data";
        }

        return response;
    }

    public ArrayList<Bus> viewExistingBuses() {
        return dbConnect.getBusDataFromDB();
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

    /**
     * checks if the input seat capacity is valid.
     * @param cap capacity
     * @return true if valid, false if not.
     */
    private boolean isValidSeatCapacity(int cap) {
        return cap >= 1 && cap <= 50;
    }

    private boolean isValidRoute(String routeCode) {
        boolean isValidRoute = false;
        ArrayList<Route> existingRoutes = dbConnect.getRouteDataFromDB();

        for(Route route: existingRoutes){
            if (routeCode.equals(route.getRouteCode())) {
                isValidRoute = true;
                break;
            }
        }

        return isValidRoute;
    }
}
