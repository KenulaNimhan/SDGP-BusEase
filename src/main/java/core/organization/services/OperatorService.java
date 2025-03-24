package core.organization.services;

import core.organization.models.Operator;
import core.util.DatabaseConnector;
import core.util.Logger;
import core.util.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class OperatorService {
    // INITIALIZING DATABASE CONNECTOR
    @Autowired
    private final DatabaseConnector dbConnect;
    // INITIALIZING ENCODER FOR HASHING
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public OperatorService(DatabaseConnector dbConnect) {
        this.dbConnect = dbConnect;
    }

    public String saveOperator(Operator ops) {
        try{
            String psw = ops.getPassword();
            ops.setPassword(encoder.encode(psw));
            return dbConnect.registerOperator(ops);
        } catch (Exception e) {
            Logger.log(e);
            return "";
        }
    }

    public boolean opsLogin(LoginRequest loginRequest) {
        String databaseResponse = dbConnect.getPassword(loginRequest.getUserNameOrEmail(), "operators");

        if(databaseResponse.equals("DB-ERROR") || databaseResponse.equals("invalid user")) {
            return false;
        } else {
            return encoder.matches(loginRequest.getPassword(), databaseResponse);
        }
    }
}
