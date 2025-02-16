import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Operator {

    public void addBus() {
        System.out.println("Enter Bus Details:");

        String vehicleNumber = InputValidator.getValidVehicleNumber();
        String busModel = InputValidator.getValidBusModel();
        int seatingCapacity = InputValidator.getValidSeatingCapacity();
        String route = InputValidator.getValidRoute();

        Bus bus = new Bus(vehicleNumber, busModel, seatingCapacity, route);
        BusStorage.saveBus(bus);
        System.out.println("Bus added successfully!");
    }

    public void viewBuses() {
        JSONArray busList = BusStorage.getBusList();
        if (busList.isEmpty()) {
            System.out.println("No buses available.");
        } else {
            System.out.println("List of Buses:");
            for (Object obj : busList) {
                JSONObject bus = (JSONObject) obj;
                System.out.println("Vehicle Number: " + bus.get("vehicleNumber"));
                System.out.println("Bus Model: " + bus.get("busModel"));
                System.out.println("Seating Capacity: " + bus.get("seatingCapacity"));
                System.out.println("Route: " + bus.get("route"));
                System.out.println("----------------------");
            }
        }
    }
}
