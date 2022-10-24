package book;

import java.util.Date;

public interface Author {
    String firstName = "";
    String lastName = "";
    Date birthDate = null;

    String getFirstName();
    String getLastName();
    Date getBirthDate();
}
