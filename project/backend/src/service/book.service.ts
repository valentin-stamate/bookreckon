import {Author, Book} from "../interface/interfaces";
import {AuthorModel, BookModel} from "../database/models";

export class BookService {
    static async getBook(id: number): Promise<Book>{
        return (await BookModel.findOne({
            where: {
                id: id,
            }
        }))?.toJSON() as Book;
    }
    static async addBook(book: Book): Promise<void> {
        delete book.id;

        await BookModel.create({
            ...book
        });
    }

    static async editBook(book: Book): Promise<void> {
        await BookModel.create({
            ...book
        });
    }

    static async deleteBook(book: Book): Promise<void> {
        await BookModel.destroy({
            where: {
                id: book.id,
            }
        });
    }

    static async addAuthor(book: Book, author: Author): Promise<void> {
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

        // @ts-ignore
        bookModel.addAuthorModel(authorModel);
    }

    static async removeAuthor(book: Book, author: Author): Promise<void> {
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

        // @ts-ignore
        bookModel.destroyAuthorModel(authorModel);
    }
}