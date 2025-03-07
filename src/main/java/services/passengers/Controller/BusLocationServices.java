package services.passengers.Controller;

/*
  Connects to Google Maps Geolocation API to retrieve
  the realtime location of a bus based on network
  signals(GPS,Wi-Fi and cell towers)

 */

import com.google.maps.GeoApiContext;
import com.google.maps.GeolocationApi;
import com.google.maps.model.GeolocationPayload;
import com.google.maps.model.GeolocationResult;


public class BusLocationServices {
    private static final String Api_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

    public static void main(String[] args){
        GeoApiContext context = new GeoApiContext.Builder() //Send requests to the Google Maps API
                .apiKey(Api_KEY)
                .build();

        try {
            GeolocationPayload payload = new GeolocationPayload();
            GeolocationResult result = GeolocationApi.geolocate(context, payload).await();

            System.out.println("Bus Location Lat "+ result.location.lat + "Lng "+ result.location.lng);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
