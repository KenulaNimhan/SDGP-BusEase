package core.organization.models.Test;

import core.organization.models.Bus;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDate;

class BusTest {

    @Test
    void testBusCreation() {
        Bus bus = new Bus("KA-01-AB-1234", "Volvo", "Route 1");
        assertEquals("KA-01-AB-1234", bus.getVehicleNo());
        assertEquals("Volvo", bus.getModel());
        assertEquals("Route 1", bus.getRoute());
    }

    @Test
    void testCapacityAssignment() {
        Bus bus = new Bus("KA-02-XY-9876", "Mercedes", 50, "Route 2");
        assertEquals(50, bus.getCapacity());
    }

    @Test
    void testSettersAndGetters() {
        Bus bus = new Bus();
        bus.setVehicleNo("TN-5678");
        bus.setModel("TATA");
        bus.setCapacity(40);
        bus.setIsWorking(true);
        bus.setLastServiceDate(LocalDate.of(2023, 10, 15));
        bus.allocateRoute("Route 3");

        assertEquals("TN-5678", bus.getVehicleNo());
        assertEquals("TATA", bus.getModel());
        assertEquals(40, bus.getCapacity());
        assertTrue(bus.isWorking());
        assertEquals(LocalDate.of(2023, 10, 15), bus.getLastServiceDate());
        assertEquals("Route 3", bus.getRoute());
    }
}

