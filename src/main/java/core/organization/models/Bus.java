package core.organization.models;

import java.time.LocalDate;

public class Bus {

    // INITIALIZING ATTRIBUTES OF A BUS
    private String vehicleNo;
    private int capacity;
    private boolean isActive;
    private LocalDate lastServiceDate;
    private String route;
    private String model;

    // CONSTRUCTORS
    public Bus() {};
    public Bus(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }
    public Bus(String vehicleNo, String model, String route) {
        this.vehicleNo = vehicleNo;
        this.model = model;
        this.route = route;
    }
    public Bus(String vehicleNo, String model, int capacity, String route) {
        this.vehicleNo = vehicleNo;
        this.model = model;
        this.capacity = capacity;
        this.route = route;
        this.isActive = false;
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
        return isActive;
    }

    public void setIsWorking(boolean status) {
        this.isActive = status;
    }

    public LocalDate getLastServiceDate() {
        return lastServiceDate;
    }

    public void setLastServiceDate(LocalDate date) {
        this.lastServiceDate = date;
    }

    public String getRoute() {
        return route;
    }

    public void allocateRoute(String route) {
        this.route = route;
    }

    @Override
    public String toString() {
        return String.format("""
                VehicleNo: %s
                Model: %s
                Capacity: %d
                Route: %s
                ---------------------------
                """, this.vehicleNo, this.model, this.capacity, this.route
        );
    }
}



