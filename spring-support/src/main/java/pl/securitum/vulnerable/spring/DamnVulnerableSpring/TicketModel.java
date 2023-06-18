package pl.securitum.vulnerable.spring.DamnVulnerableSpring;

import java.io.Serializable;

public class TicketModel implements Serializable {
    private String problem;
    private String description;

    public TicketModel(String problem, String description) {
        this.problem = problem;
        this.description = description;
    }
}
