public class Bus {
    private String vehicleNumber;
    private String busModel;
    private int seatingCapacity;
    private String route;

    public Bus(String vehicleNumber, String busModel, int seatingCapacity, String route) {
        this.vehicleNumber = vehicleNumber;
        this.busModel = busModel;
        this.seatingCapacity = seatingCapacity;
        this.route = route;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public String getBusModel() {
        return busModel;
    }

    public int getSeatingCapacity() {
        return seatingCapacity;
    }

    public String getRoute() {
        return route;
    }
}
