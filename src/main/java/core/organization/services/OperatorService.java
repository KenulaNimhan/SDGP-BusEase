package core.organization.services;

import core.organization.models.Operator;
import core.util.DatabaseConnector;
import core.util.Logger;
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
            System.out.println(ops.getUsername()+" "+ops.getEmail()+" "+ops.getPassword());
            String psw = ops.getPassword();
            ops.setPassword(encoder.encode(psw));
            return dbConnect.registerOperator(ops);
        } catch (Exception e) {
            Logger.log(e);
            return "";
        }
    }

    public void opsLogin() {
        
    }
}
