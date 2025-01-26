package services.organization;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

public class Bus {

    // INITIALIZING ATTRIBUTES OF A BUS
    private String vehicleNo;
    private int capacity;
    private boolean isWorking;
    private LocalDate lastServiceDate;
    private Route route;

    protected static List<Bus> busList = new ArrayList<>();

    // CONSTRUCTORS
    public Bus(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    // SETTER METHODS
    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public void setCapacity(int cap) {
        this.capacity = cap;
    }

    public void setLastServiceDate(LocalDate date) {
        this.lastServiceDate = date;
    }

    public void setIsWorking(boolean status) {
        this.isWorking = status;
    }

    public void allocateRoute(Route route) {
        this.route = route;
    }

    // GETTER METHODS
    public String getVehicleNo() {
        return vehicleNo;
    }

    public static List<Bus> getBusList() {
        return busList;
    }



}
