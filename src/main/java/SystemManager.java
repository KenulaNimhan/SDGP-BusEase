import services.organization.*;
import java.util.*;

public class SystemManager {
    // INITIALIZING SCANNER
    private static final Scanner scan = new Scanner(System.in);
    // ASSIGNING THE BUS LIST TO A VARIABLE FOR EASE OF REFERENCE
    private static final List<Bus> busList = Bus.getBusList();
    private static int userChoice;
    // CREATING AN OPERATOR FOR TESTING PURPOSES
    private static final Operator mainOps = new Operator("Admin", "0000");

    public static void main(String[] args){
        // ADDING OPS TO OPS LIST
        Operator.getOpsList().add(mainOps);

        mainMenu();

        System.out.println("Thank You For Using The Application!");
        System.exit(0);
    }

    private static void mainMenu() {
        // INITIALIZING VARIABLES
        boolean resume = true;

        displayMainMenu();

        while (resume) {
            userChoice = inputPromptLoop(0,3);

            switch(userChoice) {
                case 0:
                    resume = false;
                    break;
                case 1:
                    formatDisplay();
                    loginOperator();
                    formatDisplay();
                    break;
            }
        }
    }

    /**
     * displays the main menu interface.
     */
    private static void displayMainMenu() {
        System.out.print("""
            -------------------------------------------------
            *                   MAIN MENU                   *
            -------------------------------------------------
                 1) Organization Services
                 2) Passenger Services
                 3) Driver/Conductor Services
                 0) Quit
            -------------------------------------------------
            """);
    }

    private static void loginOperator() {
        System.out.print("enter username: ");
        String username = scan.nextLine();
        System.out.print("enter password: ");
        String password = scan.next();

        if (Operator.isValidOperator(username, password)) {
            organizationMenu(new Operator(username, password));
        } else {
            System.out.println("operator info invalid");
        }

    }

    /**
     * displays organization menu interface and contains the functionalities.
     * @param opsUser the operator who is accessing in that instance.
     */
    private static void organizationMenu(Operator opsUser) {
        // INITIALIZING VARIABLES
        boolean resume = true;

        System.out.print("""
            -------------------------------------------------
            *                 OPERATOR MENU                 *
            -------------------------------------------------
                 1) Add Employee
                 2) View Employees
                 3) View Bus List
                 4) Add Bus
                 0) Main Menu
            -------------------------------------------------
            """);

        while (resume) {
            userChoice = inputPromptLoop(0,4);

            switch(userChoice) {
                case 0:
                    resume = false;
                    displayMainMenu();
                    break;
                case 1:
                    formatDisplay();
                    opsUser.createEmp();
                    formatDisplay();
                    break;
                case 2:
                    formatDisplay();
                    opsUser.viewEmployees();
                    formatDisplay();
                    break;
                case 3:
                    formatDisplay();
                    opsUser.viewBusList();
                    formatDisplay();
                    break;
                case 4:
                    formatDisplay();
                    opsUser.addBus();
                    formatDisplay();
                    break;
            }
        }
    }

    /**
     * Runs loop prompting for input until valid input is entered.
     * Guarantees that only a valid input is returned.
     * @param rangeStart first index of input entry range.
     * @param rangeEnd last index of input entry range.
     * @return user input.
     */
    private static int inputPromptLoop(int rangeStart, int rangeEnd) {
        int userChoice;

        while(true){
            System.out.print("enter your selection: ");
            try{
                userChoice = scan.nextInt();
                if (userChoice>=rangeStart && userChoice<=rangeEnd){
                    break;
                } else {
                    System.out.println("selection not within range");
                }
            } catch (InputMismatchException e){
                System.out.println("invalid selection");
            }
        }
        scan.nextLine();
        return userChoice;
    }

    public static void formatDisplay() {
        System.out.println("\u001B[34m------\u001B[0m");
    }
}
