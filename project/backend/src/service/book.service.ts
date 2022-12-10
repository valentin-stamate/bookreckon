import {Author, Book} from "../interface/interfaces";
import {AuthorModel, BookModel} from "../database/models";
import {Mop} from "../mop/mop";

export class BookService {
    static async getBook(id: number): Promise<Book>{
        Mop.startCall("The monitor for getBook method from BookService is called with: " + id);
        const result = (await BookModel.findOne({
            where: {
                id: id,
            }
        }))?.toJSON() as Book;
        Mop.endCall(result);
        return result;
    }

    static async addBook(book: Book): Promise<void> {
        Mop.startCall("The monitor for addBook method from BookService is called with: " + book);
        delete book.id;

        await BookModel.create({
            ...book
        });

        Mop.endCall(true);
    }
}