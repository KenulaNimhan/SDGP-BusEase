import services.organization.*;
import java.util.*;

public class SystemManager {
    // INITIALIZING SCANNER
    private static final Scanner scan = new Scanner(System.in);
    // ASSIGNING THE BUS LIST TO A VARIABLE FOR EASE OF REFERENCE
    private static final List<Bus> busList = Bus.getBusList();
    private static int userChoice;


    public static void main(String[] args){
        // INITIALIZING VARIABLES
        boolean resume = true;

        // CREATING AN OPERATOR FOR TESTING PURPOSES
        Operator ops = new Operator("Kenula", "1234");

        // DISPLAYING THE MAIN MENU
        while (resume) {
            System.out.println("""
                *************************************************
                *                 MENU OPTIONS                  *
                *************************************************
                     1) Organization Services
                     2) Passenger Services
                     3) Driver/Conductor Services
                     0) Quit
                *************************************************
                """);
            userChoice = inputPromptLoop(0,3);

            switch(userChoice) {
                case 0:
                    resume = false;
                    break;
                case 1:
                    organizationMenu(ops);
                    break;
                default:
                    System.out.println("invalid entry");
                    break;
            }
        }

        System.out.println("Thank You For Using The Application!");
        System.exit(0);
    }


    private static void organizationMenu(Operator opsUser) {

        while (true) {
            System.out.println("""
                *************************************************
                *                 MENU OPTIONS                  *
                *************************************************
                     1) View Bus List
                     2) Add Bus
                     0) Main Menu
                *************************************************
                """);
            userChoice = inputPromptLoop(0,1);

            switch(userChoice) {
                case 0:
                    return;
                case 1:
                    opsUser.viewBusList();
                    break;
                case 2:
                    opsUser.addBus();
                    break;
            }
        }

    }

    /**
     * Runs loop prompting for input until valid input is entered.
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
                if (userChoice<=rangeStart && userChoice>=rangeEnd){
                    System.out.println("selection not within range");
                } else {
                    break;
                }
            } catch (InputMismatchException e){
                System.out.println("invalid selection");
            }
        }
        return userChoice;
    }
}
