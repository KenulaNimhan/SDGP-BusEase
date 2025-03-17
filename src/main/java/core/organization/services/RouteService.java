package core.organization.services;

import core.organization.models.Route;
import core.util.DatabaseConnector;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RouteService {
    // INITIALIZING DATABASE CONNECTOR
    private static final DatabaseConnector dbConnect = new DatabaseConnector();

    public boolean addRoute(Route route) {
        if(route.getRouteCode() == null || route.getStartDestination() == null || route.getEndDestination() == null) {
            // returns false since data is invalid.
            return false;
        } else {
            String message = dbConnect.addRouteToDB(route);
            return message.equals("DB-DONE");
        }
    }

    public ArrayList<Route> viewExistingRoutes() {
        return dbConnect.getRouteDataFromDB();
    }
}
