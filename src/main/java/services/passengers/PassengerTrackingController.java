package services.passengers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/passenger")
public class    PassengerTrackingController {
    private PassengerService passengerService;

    @Autowired
    public PassengerTrackingController(PassengerService passengerService) {
        this.passengerService = passengerService;
    }

    // Method to simulate receiving GPS data from the frontend
    @PostMapping("/track")
    public void receiveGPSData(String id, double latitude, double longitude) {
        passengerService.updatePassengerLocation(id, latitude, longitude);
        System.out.println("Updated location for passenger: " + id);
    }
}
