import java.util.Scanner;
import java.util.regex.Pattern;

public class InputValidator {
    private static Scanner scanner = new Scanner(System.in);

    public static String getValidVehicleNumber() {
        String vehicleNumber;
        String pattern = "^[A-Z]{2,3}-\\d{4}$";
        do {
            System.out.print("Enter Vehicle Number (e.g., ABC-1234 or AB-1234): ");
            vehicleNumber = scanner.nextLine();
            if (!Pattern.matches(pattern, vehicleNumber)) {
                System.out.println("Invalid format. Use ABC-1234 or AB-1234.");
            }
        } while (!Pattern.matches(pattern, vehicleNumber));
        return vehicleNumber;
    }

    public static String getValidBusModel() {
        String busModel;
        do {
            System.out.print("Enter Bus Model: ");
            busModel = scanner.nextLine().trim();
            if (busModel.isEmpty()) {
                System.out.println("Bus model cannot be empty.");
            }
        } while (busModel.isEmpty());
        return busModel;
    }

    public static int getValidSeatingCapacity() {
        int capacity;
        do {
            System.out.print("Enter Seating Capacity (10 - 100): ");
            while (!scanner.hasNextInt()) {
                System.out.print("Invalid input. Enter a number: ");
                scanner.next();
            }
            capacity = scanner.nextInt();
            scanner.nextLine(); // Consume newline
            if (capacity < 10 || capacity > 100) {
                System.out.println("Seating capacity must be between 10 and 100.");
            }
        } while (capacity < 10 || capacity > 100);
        return capacity;
    }

    public static String getValidRoute() {
        String route;
        do {
            System.out.print("Enter Route: ");
            route = scanner.nextLine().trim();
            if (route.isEmpty()) {
                System.out.println("Route cannot be empty.");
            }
        } while (route.isEmpty());
        return route;
    }
}
