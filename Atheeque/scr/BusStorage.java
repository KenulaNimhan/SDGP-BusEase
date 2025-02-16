import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class BusStorage {
    private static final String JSON_FILE = "buses.json";

    public static void saveBus(Bus bus) {
        JSONArray busList = getBusList();
        JSONObject busObject = new JSONObject();
        busObject.put("vehicleNumber", bus.getVehicleNumber());
        busObject.put("busModel", bus.getBusModel());
        busObject.put("seatingCapacity", bus.getSeatingCapacity());
        busObject.put("route", bus.getRoute());

        busList.add(busObject);

        try (FileWriter file = new FileWriter(JSON_FILE)) {
            file.write(busList.toJSONString());
            file.flush();
        } catch (IOException e) {
            System.out.println("Error saving bus data: " + e.getMessage());
        }
    }

    public static JSONArray getBusList() {
        try (FileReader reader = new FileReader(JSON_FILE)) {
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(reader);
            return (JSONArray) obj;
        } catch (IOException | ParseException e) {
            return new JSONArray();
        }
    }
}
