package organization.models;

import java.time.LocalTime;
import java.util.*;

public class Route {
    private String routeCode;
    private List<String> destinations;
    private LocalTime startTime;
    private LocalTime endTime;

    // Store predefined routes
    private static final Map<String, Route> routeMap = new HashMap<>();

    // Static block to initialize predefined routes
    static {
        routeMap.put("138", new Route("138", Arrays.asList("Maharagama", "Vijerama", "Nugegoda", "Kirlupana", "Thibirigasyaya"), LocalTime.of(12, 12), LocalTime.of(13, 13)));
    }

    // Constructor
    public Route(String routeCode, List<String> destinations, LocalTime startTime, LocalTime endTime) {
        this.routeCode = routeCode;
        this.destinations = destinations;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getRouteCode() {
        return routeCode;
    }

    // Method to retrieve a Route by its code
    public static Route getRouteByCode(String routeCode) {
        return routeMap.get(routeCode);
    }

    @Override
    public String toString() {
        return "Route Code: " + routeCode + "\n" +
                "Destinations: " + destinations + "\n" +
                "Start Time: " + startTime + "\n" +
                "End Time: " + endTime;
    }
}

