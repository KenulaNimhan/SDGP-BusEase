import java.util.*;

import organization.models.Operator;

public class SystemManager {
    // INITIALIZING SCANNER
    private static final Scanner scan = new Scanner(System.in);
    // INITIALIZING VARIABLE
    private static int userChoice;

    public static void main(String[] args){

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
                 5) Change My Username
                 6) Change My Password
                 0) Main Menu
            -------------------------------------------------
            """);

        while (resume) {
            userChoice = inputPromptLoop(0,6);

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
                case 5:
                    formatDisplay();
                    opsUser.changeUsername();
                    formatDisplay();
                    break;
                case 6:
                    formatDisplay();
                    opsUser.changePassword();
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
            System.out.print("\u001B[44m\u001B[30m enter your selection:\u001B[0m ");
            try{
                userChoice = scan.nextInt();
                if (userChoice>=rangeStart && userChoice<=rangeEnd){
                    break;
                } else {
                    System.out.println("selection not within range");
                }
            } catch (InputMismatchException e){
                System.out.println("invalid selection");
                scan.nextLine(); // used to collect the invalid input
            }
        }
        scan.nextLine();
        return userChoice;
    }

    public static void formatDisplay() {
        System.out.println("\u001B[34m------\u001B[0m");
    }
    public static void formatDisplay(String color) {
        switch (color) {
            case "red":
                System.out.println("\u001B[31m------\u001B[0m");
                break;
            case "green":
                System.out.println("\u001B[32m------\u001B[0m");
                break;
            case "yellow":
                System.out.println("\u001B[33m------\u001B[0m");
                break;
            default:
                System.out.println("\u001B[34m------\u001B[0m");
        }

    }
}
