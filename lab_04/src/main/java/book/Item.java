package book;

import java.nio.Buffer;

public interface Item {
    Buffer cover = null;
    String details = "";
    String name = "";

    Buffer getPhoto();
    String getDetails();
    String getName();

    Item cloneItem();
}
