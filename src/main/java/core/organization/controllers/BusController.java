//package core.organization.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Repository;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import core.organization.models.Bus;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/buses")
//public class BusController {
//
//    @Autowired
//    private BusService busService;
//
//    @Autowired
//    //private Operator operatorService; // Assuming this is to handle operator-related tasks
//
//    @PostMapping("/search")
//    public ResponseEntity<List<Bus>> searchBuses(@RequestBody BusSearchRequest searchRequest) {
//        List<Bus> matchedBuses = busService.searchBuses(searchRequest);
//        if (matchedBuses.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(matchedBuses);
//        }
//        return ResponseEntity.ok(matchedBuses);
//    }
//
//    @PostMapping("/add")
//    public ResponseEntity<String> addBus(@RequestBody Bus bus) {
//        // Call service to add a bus
//        busService.addBus(bus);
//        return ResponseEntity.ok("Bus added successfully!");
//    }
//}
//
//// DTO for search request
//class BusSearchRequest {
//    private String vehicleNo;
//    private String model;
//    private String routeCode;
//
//    // Getters and setters
//    public String getVehicleNo() { return vehicleNo; }
//    public void setVehicleNo(String vehicleNo) { this.vehicleNo = vehicleNo; }
//    public String getModel() { return model; }
//    public void setModel(String model) { this.model = model; }
//    public String getRouteCode() { return routeCode; }
//    public void setRouteCode(String routeCode) { this.routeCode = routeCode; }
//}
//
//@Service
//class BusService {
//
//    @Autowired
//    private BusRepository busRepository;
//
//    public List<Bus> searchBuses(BusSearchRequest searchRequest) {
//        return busRepository.findBuses(searchRequest.getVehicleNo(), searchRequest.getModel(), searchRequest.getRouteCode());
//    }
//
//    public void addBus(Bus bus) {
//        // Logic to add a new bus to the repository (simplified)
//        busRepository.save(bus);
//    }
//}
//
//@Repository
//interface BusRepository {
//    List<Bus> findBuses(String vehicleNo, String model, String routeCode);
//
//    void save(Bus bus); // Method to save the bus
//}
