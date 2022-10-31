import {Author, Book} from "../interface/interfaces";

export class BookService {
    static getBook():Promise<Book>{
        return Promise.reject();
    }
    static addBook(book: Book): Promise<void> {
        return Promise.reject();
    }

    static editBook(book: Book): Promise<void> {
        return Promise.reject();
    }

    static deleteBook(book: Book): Promise<void> {
        return Promise.reject();
    }

    static addAuthor(book: Book, author: Author): Promise<void> {
        return Promise.reject();
    }

    static removeAuthor(book: Book, author: Author): Promise<void> {
        return Promise.reject();
    }
}