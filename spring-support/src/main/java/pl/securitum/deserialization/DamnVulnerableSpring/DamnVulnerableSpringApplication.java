package pl.securitum.deserialization.DamnVulnerableSpring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.Base64;

@SpringBootApplication
@RestController
public class DamnVulnerableSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(DamnVulnerableSpringApplication.class, args);
	}

	@PostMapping({"/support"})
	public String createSupportTicket(@RequestParam String problem, @RequestParam String description) throws IOException {
		TicketModel ticket = new TicketModel(problem, description);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(baos);
		oos.writeObject(ticket);
		oos.close();
		return Base64.getEncoder().encodeToString(baos.toByteArray());
	}

	@PostMapping({"/support/confirm"})
	public String confirmSupportTicket(@RequestParam String confirmation) throws IOException, ClassNotFoundException {
		byte[] data = Base64.getDecoder().decode(confirmation);
		ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data));
		TicketModel ticket = (TicketModel)ois.readObject();
		ois.close();
		return "confirmed";
	}
}
