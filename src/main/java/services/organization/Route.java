package services.organization;

import java.util.List;
import java.time.*;

public class Route {
    private String routeCode;
    private List<String> destinations;
    private LocalTime startTime;
    private LocalTime endTime;

    public Route(String routeCode) {
        this.routeCode = routeCode;
    }
}
