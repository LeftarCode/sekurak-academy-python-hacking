package pl.securitum.deserialization.DamnVulnerableSpring;

import org.apache.commons.collections.Factory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.collections.list.LazyList;

import java.io.*;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@SpringBootApplication
@RestController
public class DamnVulnerableSpringApplication {

	public static void main(String[] args)  throws IOException, ClassNotFoundException {
		SpringApplication.run(DamnVulnerableSpringApplication.class, args);

		Factory factory = new Factory() {
			public Object create() {
				return new Date();
			}
		};

		List lazy = LazyList.decorate(new ArrayList(), factory);
		Object obj = lazy.get(3);
		System.out.println(obj);
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
		Object ticket = ois.readObject();
		ois.close();
		return "confirmed";
	}
}
