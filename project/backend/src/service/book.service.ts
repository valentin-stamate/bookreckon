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

    static async editBook(book: Book): Promise<void> {
        Mop.startCall("The monitor for editBook method from BookService is called with: " + book);
        await BookModel.create({
            ...book
        });

        Mop.endCall(true);
    }

    static async deleteBook(book: Book): Promise<void> {
        Mop.startCall("The monitor for deleteBook method from BookService is called with: " + book);
        await BookModel.destroy({
            where: {
                id: book.id,
            }
        });

        Mop.endCall(true);
    }

    static async addAuthor(book: Book, author: Author): Promise<void> {
        Mop.startCall("The monitor for addAuthor method from BookService for book and author is called with: " + {book, author});
        const bookModel = await BookModel.findOne({
            where: {
                id: book.id,
            }
        });

        const authorModel = await AuthorModel.findOne({
            where: {
                id: author.id,
            }
        });

        Mop.endCall({bookModel, authorModel});

        // @ts-ignore
        bookModel.addAuthorModel(authorModel);
    }

    static async removeAuthor(book: Book, author: Author): Promise<void> {
        Mop.startCall("The monitor for addAuthor method from BookService for book and author is called with: " + {book, author});
        const bookModel = await BookModel.findOne({
            where: {
                id: book.id,
            }
        });

        const authorModel = await AuthorModel.findOne({
            where: {
                id: author.id,
            }
        });

        Mop.endCall({bookModel, authorModel});

        // @ts-ignore
        bookModel.destroyAuthorModel(authorModel);
    }
}