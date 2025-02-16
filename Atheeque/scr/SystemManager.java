import java.util.Scanner;

public class SystemManager {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Operator operator = new Operator();

        while (true) {
            System.out.println("\nBus Management System");
            System.out.println("1. Add Bus");
            System.out.println("2. View Buses");
            System.out.println("3. Exit");
            System.out.print("Choose an option: ");

            while (!scanner.hasNextInt()) {
                System.out.print("Invalid input. Enter a number: ");
                scanner.next();
            }

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1:
                    operator.addBus();
                    break;
                case 2:
                    operator.viewBuses();
                    break;
                case 3:
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice, try again.");
            }
        }
    }
}
