package core.util;
import java.io.*;
import java.time.LocalDateTime;

public class Logger {
    protected static File logFolder = new File("src/main/resources/Logs");

    /**
     * Logs message to a file.
     * @param msg = message.
     */
    public static void log(String msg) {
        if(logFolder.mkdir()){System.out.println("log folder created");}
        String filepath = "src/main/resources/Logs/general_logs.txt";
        try (FileWriter writer = new FileWriter(filepath, true);) {
            writer.write(LocalDateTime.now()+" "+msg+"\n");
        } catch (IOException e){
            System.out.println("error: cannot save details in file.");
        }
    }

    /**
     * logs error message to a file.
     * @param exc = exception.
     */
    public static void log(Exception exc) {
        if(logFolder.mkdir()){System.out.println("log folder created");}
        String filepath = "src/main/resources/Logs/exception_logs.txt";
        try (FileWriter writer = new FileWriter(filepath, true);) {
            writer.write(LocalDateTime.now()+" "+exc.getMessage()+"\n");
        } catch (IOException e){
            System.out.println("error: cannot save details in file.");
        }
    }
}



