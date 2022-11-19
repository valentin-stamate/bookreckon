import {DATASET} from "./database/dataset/books";
import {BookService} from "./service/book.service";

async function importBookDataset() {
    const dataset = DATASET;

    for (let book of dataset) {
        await BookService.addBook(book);
    }
}

importBookDataset()
    .catch(err => {
        console.log(err);
    });
