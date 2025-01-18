package core.util;
import java.io.*;
import java.time.LocalDateTime;

public class Logger {
    protected static File logFolder = new File("Logs");

    public void writeToFile(String msg) {
        if(logFolder.mkdir()){System.out.println("log folder created");}
        String filepath = "Logs/general_logs.txt";
        try {
            FileWriter writer = new FileWriter(filepath);
            writer.write(LocalDateTime.now()+" "+msg);
            writer.close();
        } catch (IOException e){
            System.out.println("error: cannot save details in file.");
        }
    }
}
