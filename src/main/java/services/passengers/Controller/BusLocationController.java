package services.passengers.Controller;

import com.google.maps.model.GeolocationResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bus-location")
public class BusLocationController {

    @GetMapping
    public GeolocationResult getBusLocation(){
        return BusLocationServices.getBusLocation();
    }
}
