package services.passengers;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class PassengerService {
    private Map<String, Passenger> passengerData = new HashMap<>();

    // Add or update passenger location
    public void updatePassengerLocation(String id, double latitude, double longitude) {
        if (passengerData.containsKey(id)) {
            Passenger passenger = passengerData.get(id);
            passenger.setLatitude(latitude);
            passenger.setLongitude(longitude);
        } else {
            System.out.println("Passenger not found!");
        }
    }

    // Get passenger location
    public Passenger getPassengerLocation(String id) {
        return passengerData.get(id);
    }

    // Register a new passenger
    public void addPassenger(Passenger passenger) {
        passengerData.put(passenger.getId(), passenger);
    }
}
