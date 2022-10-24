import book.Book;

import java.util.Iterator;
import java.util.List;

public interface Category {
    String name = "";
    List<Book> book = null;
    String description = "";

    Iterator<Book> iterateTroughBooks();
}