package core.util;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;

public class ExceptionLogger extends Logger{

    public void writeToFile(Exception exc) {
        if(logFolder.mkdir()){System.out.println("log folder created");}
        String filepath = "Logs/exception_logs.txt";
        try {
            FileWriter writer = new FileWriter(filepath);
            writer.write(LocalDateTime.now()+" "+exc.getMessage());
            writer.close();
        } catch (IOException e){
            System.out.println("error: cannot save details in file.");
        }
    }
}
