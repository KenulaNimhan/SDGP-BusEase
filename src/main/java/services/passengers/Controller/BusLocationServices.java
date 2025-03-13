//package services.passengers.Controller;
//
///*
//  Connects to Google Maps Geolocation API to retrieve
//  the realtime location of a bus based on network
//  signals(GPS,Wi-Fi and cell towers)
//
// */
//
//import com.google.maps.GeoApiContext;
//import com.google.maps.GeolocationApi;
//import com.google.maps.model.GeolocationPayload;
//import com.google.maps.model.GeolocationResult;
//
//
//public class BusLocationServices {
//    private static final String Api_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
//
//    private static GeoApiContext getGeoContext(){
//        return new GeoApiContext.Builder() //Send requests to the Google Maps API
//                .apiKey(Api_KEY)
//                .build();
//    }
//
//    public static GeolocationResult getBusLocation(){
//        try {
//            GeolocationPayload payload = new GeolocationPayload();
//            return GeolocationApi.geolocate(getGeoContext(), payload).await();
//
//        }catch (Exception e){
//            e.printStackTrace();
//            return null;
//        }
//
//    }
//
//}
//
///*
//public class TestBusLocation {
//    public static void main(String[] args) {
//        GeolocationResult result = BusLocationService.getBusLocation();
//        if (result != null) {
//            System.out.println("Bus Location: Lat " + result.location.lat + ", Lng " + result.location.lng);
//        } else {
//            System.out.println("Failed to fetch bus location.");
//        }
//    }
//}
// */