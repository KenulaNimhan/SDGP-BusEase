//package services.passengers.Controller;
///*
//Direction API to get the bus route
// */
//import com.google.maps.DirectionsApi;
//import com.google.maps.GeoApiContext;
//import com.google.maps.model.DirectionsResult;
//import com.google.maps.model.TravelMode;
//
//public class BusRouteService {
//    private static final String Api_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
//
//     public static GeoApiContext getGeoContext(){
//         return new GeoApiContext.Builder()
//                 .apiKey(Api_KEY)
//                 .build();
//
//     }
//
//     public static String getBusRoute(String origin, String destination){
//         try {
//             DirectionsResult result = DirectionsApi.newRequest(getGeoContext())
//                     .mode(TravelMode.DRIVING) //Set mode to driving (for buses)
//                     .origin(origin)
//                     .destination(destination)
//                     .await();
//
//             return result.routes.length > 0 ? result.routes[0].summary : "No route found";
//         }catch (Exception e){
//             e.printStackTrace();
//             return "Error fetching routes: "+e.getMessage();
//         }
//     }
//
//
//
//}
