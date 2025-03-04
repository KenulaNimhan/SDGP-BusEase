package services.organization;

import java.time.LocalTime;
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
    private String model;

    protected static List<Bus> busList = new ArrayList<>();

    // CONSTRUCTORS
    public Bus() {};
    public Bus(String vehicleNo) {
        this.vehicleNo = vehicleNo;
        busList.add(this);
    }
    public Bus(String vehicleNo, String model, int capacity, Route route) {
        this.vehicleNo = vehicleNo;
        this.model = model;
        this.capacity = capacity;
        this.route = route;
        busList.add(this);
    }

    // Getter and Setter Methods
    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int cap) {
        this.capacity = cap;
    }

    public boolean isWorking() {
        return isWorking;
    }

    public void setIsWorking(boolean status) {
        this.isWorking = status;
    }

    public LocalDate getLastServiceDate() {
        return lastServiceDate;
    }

    public void setLastServiceDate(LocalDate date) {
        this.lastServiceDate = date;
    }

    public Route getRoute() {
        return route;
    }

    public void allocateRoute(Route route) {
        this.route = route;
    }

    public static List<Bus> getBusList() {
        return busList;
    }

    public static void setBusList(ArrayList<Bus> buses) {
        busList = buses;
    }
}



