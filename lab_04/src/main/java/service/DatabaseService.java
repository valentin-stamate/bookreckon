package service;

import java.util.List;

public class DatabaseService implements User {

    private static DatabaseService databaseService;

    private DatabaseService() { };

    DatabaseService getInstance() {
        if (databaseService == null) {
            databaseService = new DatabaseService();
        }

        return databaseService;
    }

    List<User> getUsers() {
        return null;
    }

}
