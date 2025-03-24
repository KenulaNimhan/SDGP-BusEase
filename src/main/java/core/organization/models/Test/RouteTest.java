package core.organization.models.Test;

import core.organization.models.Route;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RouteTest {

    @Test
    void testRouteCreation() {
        Route route = new Route("R1", "City A", "City B");
        assertEquals("R1", route.getRouteCode());
        assertEquals("City A", route.getStartDestination());
        assertEquals("City B", route.getEndDestination());
    }

    @Test
    void testSettersAndGetters() {
        Route route = new Route();
        route.setRouteCode("R2");
        route.setStartDestination("City X");
        route.setEndDestination("City Y");

        assertEquals("R2", route.getRouteCode());
        assertEquals("City X", route.getStartDestination());
        assertEquals("City Y", route.getEndDestination());
    }
}

