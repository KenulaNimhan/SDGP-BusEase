package services.organization;

import java.util.ArrayList;
import java.util.List;

public class Bus {

    // INITIALIZING ATTRIBUTES OF A BUS
    private String vehicleNo;
    private int capacity;
    private boolean working;

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

    // GETTER METHODS
    public String getVehicleNo() {
        return vehicleNo;
    }

    public static List<Bus> getBusList() {
        return busList;
    }

}
