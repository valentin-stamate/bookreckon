package book;

public class ItemFactory {

    public Item getItem(String type) {
        if (type.equals("book")) {
            return new Book();
        }

        return null;
    }

}
