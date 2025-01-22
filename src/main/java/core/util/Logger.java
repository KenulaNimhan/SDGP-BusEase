package core.util;
import java.io.*;
import java.time.LocalDateTime;

public class Logger {
    protected static File logFolder = new File("Logs");

    /**
     * Logs message to a file.
     * @param msg = message.
     */
    public static void log(String msg) {
        if(logFolder.mkdir()){System.out.println("log folder created");}
        String filepath = "Logs/general_logs.txt";
        try (FileWriter writer = new FileWriter(filepath, true);) {
            writer.write(LocalDateTime.now()+" "+msg);
        } catch (IOException e){
            System.out.println("error: cannot save details in file.");
        }
    }

    public static class ExceptionLogger extends Logger{

        /**
         * logs error message to a file.
         * @param exc = exception.
         */
        public static void log(Exception exc) {
            if(logFolder.mkdir()){System.out.println("log folder created");}
            String filepath = "Logs/exception_logs.txt";
            try (FileWriter writer = new FileWriter(filepath, true);) {
                writer.write(LocalDateTime.now()+" "+exc.getMessage());
            } catch (IOException e){
                System.out.println("error: cannot save details in file.");
            }
        }
    }
}



