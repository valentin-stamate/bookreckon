import {BookService} from "../service/book.service";
import {DATASET} from "../database/dataset/books";


export async function importBookDataset() {
    const dataset = DATASET;

    for (let book of dataset) {
        await BookService.addBook(book);
    }

}