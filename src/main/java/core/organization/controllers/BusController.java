package core.organization.controllers;

import core.organization.models.Bus;
import core.organization.models.Route;
import core.organization.services.BusService;
import core.util.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/buses")
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping("/view")
    private ArrayList<Bus> getExistingBuses() {
        return busService.viewExistingBuses();
    }

    @PostMapping("/addNew")
    private String addNewBus(@RequestBody Bus bus) {
        return busService.addBus(bus);
    }

}
