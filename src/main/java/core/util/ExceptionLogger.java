//package core.util;
//
//import java.io.FileWriter;
//import java.io.IOException;
//import java.time.LocalDateTime;
//
//public class ExceptionLogger extends Logger{
//
//    /**
//     * logs error message to a file.
//     * @param exc = exception.
//     */
//    public static void log(Exception exc) {
//        if(logFolder.mkdir()){System.out.println("log folder created");}
//        String filepath = "src/main/resources/Logs/exception_logs.txt";
//        try (FileWriter writer = new FileWriter(filepath, true);) {
//            writer.write(LocalDateTime.now()+" "+exc.getMessage()+"\n");
//        } catch (IOException e){
//            System.out.println("error: cannot save details in file.");
//        }
//    }
//}
