package book;

import java.nio.Buffer;
import java.util.List;

public interface BookInterface extends Item {
    String imdb = "";
    String youtubeLink = "";
    List<Author> authors = null;
    String genre = "";
    Buffer audio = null;

    String getImdb();
    String getYoutubeLink();
    List<Author> getAuthors();
    String getGenre();
    Buffer getAudio();

    @Override
    Item cloneItem();
}
