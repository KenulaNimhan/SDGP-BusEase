package core.organization.controllers;

import core.organization.models.Route;
import core.organization.services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping("/view")
    private ArrayList<Route> getExistingRoutes() {
        return routeService.viewExistingRoutes();
    }

    @PostMapping("/addNew")
    private boolean addNewRoute(@RequestBody Route route) {
        return routeService.addRoute(route);
    }

}
