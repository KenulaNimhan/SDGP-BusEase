package core.util;
// loading the driver for mysql connection
import com.mysql.jdbc.Driver;

import java.sql.*;

public class DatabaseConnector {


    Connection sqlConnection;
    {
        try {
            sqlConnection = DriverManager.getConnection("jdbc:mysql://localhost:3306/sample", "root", "");
            System.out.println("connected successfully");
        } catch (SQLException e) {
            System.out.println("connection failed");
            Logger.log(e);
        }
    }
}
