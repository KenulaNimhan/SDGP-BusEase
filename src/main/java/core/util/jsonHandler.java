package core.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import services.organization.Operator;
import java.io.File;
import java.io.IOException;

public class jsonHandler {
    // INITIALIZING OBJECT MAPPER
    private static final ObjectMapper mapper = new ObjectMapper();

    public static Operator readMainAdmin() {
        try{
            return mapper.readValue(new File("src/main/resources/adminCred.json"), Operator.class);
        } catch (IOException e) {
            Logger.log(e);
            return null;
        }
    }
}
