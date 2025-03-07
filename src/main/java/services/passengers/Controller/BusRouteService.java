package services.passengers.Controller;
/*
Direction API to get the bus route
 */
import com.google.maps.DirectionsApi;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DirectionsResult;


public class BusRouteService {
    private static final String Api_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

    public static void main(String[] args){
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(Api_KEY)
                .build();

        try {
            DirectionsResult result = DirectionsApi.getDirections(context,
                    "Current_Location", "Destination_Location").await();

            System.out.println("Route: "+ result.routes[0].summary);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
