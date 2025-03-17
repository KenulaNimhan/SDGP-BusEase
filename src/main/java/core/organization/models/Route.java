package core.organization.models;

public class Route {
    private String routeCode;
    private String startDestination;
    private String endDestination;

    // CONSTRUCTOR
    public Route(){};
    public Route(String routeCode,String startDestination, String endDestination) {
        this.routeCode = routeCode;
        this.startDestination = startDestination;
        this.endDestination = endDestination;
    }

    //GETTER METHODS
    public String getRouteCode() {
        return routeCode;
    }
    public String getStartDestination() {
        return startDestination;
    }
    public String getEndDestination() {
        return endDestination;
    }

    // SETTER METHODS
    public void setRouteCode(String routeCode) {
        this.routeCode = routeCode;
    }
    public void setStartDestination(String startDestination) {
        this.startDestination = startDestination;
    }
    public void setEndDestination(String endDestination) {
        this.endDestination = endDestination;
    }

    @Override
    public String toString() {
        return String.format("""
                Route:  %s
                Start:  %s
                End  :  %s
                """,this.routeCode, this.startDestination, this.endDestination);
    }
}

