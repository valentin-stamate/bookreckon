import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {StatusCode} from "../const/const";
import {UserService} from "../service/user.service";
import {BookService} from "../service/book.service";
import {Author, Book, Preference, User} from "../interface/interfaces";

export class BookController{
    //getBook
    static async getBook(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.preferences == null){
            next(new ResponseError("Invalid form : Get book",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = req.get("id") as unknown as number;

            await BookService.getBook(id);
            res.end();
        } catch(err) {
            next(err)
        }

    }

    //addBook
    static async addBook(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.name != null || body.authors != null){
            next(new ResponseError("Invalid form : Add book",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = req.get("id") as unknown as number;
            const name = req.get("name") as string;
            const genre = req.get("genre") as string;
            const authors = req.get("authors") as unknown as Author[];
            const audio = req.get("audio") as unknown as Buffer;
            const photo = req.get("photo") as string;
            const details = req.get("details") as string;
            const imdb = req.get("imdb") as string;
            const youtube = req.get("youtube") as string;

            await BookService.addBook({id, name, genre, authors, audio, photo, details, imdb, youtube});
            res.end();
        } catch(err) {
            next(err)
        }

    }


    //editBook
    static async editBook(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null){
            next(new ResponseError("Invalid form : Edit book",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = req.get("id") as unknown as number;
            const name = req.get("name") as string;
            const genre = req.get("genre") as string;
            const authors = req.get("authors") as unknown as Author[];
            const audio = req.get("audio") as unknown as Buffer;
            const photo = req.get("photo") as string;
            const details = req.get("details") as string;
            const imdb = req.get("imdb") as string;
            const youtube = req.get("youtube") as string;

            const book: Book = {id, name, genre, authors, audio, photo, details, imdb, youtube};
            const db_book: Book = await BookService.getBook(id);
            if (book.name != db_book.name ||
                book.genre != db_book.genre ||
                book.authors != db_book.authors ||
                book.audio != db_book.audio ||
                book.photo != db_book.photo ||
                book.details != db_book.details ||
                book.imdb != db_book.imdb ||
                book.youtube != db_book.youtube
            ){
                await BookService.editBook({id, name, genre, authors, audio, photo, details, imdb, youtube});
            }
            res.end();
        } catch(err) {
            next(err)
        }

    }


    //deleteBook
    static async deleteBook(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        if (body.id == null) {
            next(new ResponseError("Invalid form : Delete book", StatusCode.BAD_REQUEST));
            return;
        }

        try {
            const id = req.get("id") as unknown as number;

            await BookService.deleteBook(await BookService.getBook(id));
            res.end();
        } catch (err) {
            next(err)
        }
    }
    //addAuthor
    static async addAuthor(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.lastName == null){
            next(new ResponseError("Invalid form : Add author",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const idBook = req.get("id") as unknown as number;
            const nameBook = req.get("name") as string;
            const genre = req.get("genre") as string;
            const authors = req.get("authors") as unknown as Author[];
            const audio = req.get("audio") as unknown as Buffer;
            const photo = req.get("photo") as string;
            const details = req.get("details") as string;
            const imdb = req.get("imdb") as string;
            const youtube = req.get("youtube") as string;

            const book: Book = {id: idBook, name: nameBook, genre, authors, audio, photo, details, imdb, youtube};


            const idAuthor = req.get("idAuthor") as unknown as number;
            const lastName = req.get("lastName") as string;
            const firstName = req.get("firstName") as string;
            const birthDate = req.get("birthDate") as unknown as Date;

            const author: Author = {id : idAuthor, firstName: firstName, lastName: lastName, birthDate: birthDate};

            await BookService.addAuthor(book ,author);
            res.end();
        } catch(err) {
            next(err)
        }

    }

    //removeAuthor
    static async removeAuthor(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.lastName == null){
            next(new ResponseError("Invalid form : Remove author",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const idBook = req.get("id") as unknown as number;
            const nameBook = req.get("name") as string;
            const genre = req.get("genre") as string;
            const authors = req.get("authors") as unknown as Author[];
            const audio = req.get("audio") as unknown as Buffer;
            const photo = req.get("photo") as string;
            const details = req.get("details") as string;
            const imdb = req.get("imdb") as string;
            const youtube = req.get("youtube") as string;

            const book: Book = {id: idBook, name: nameBook, genre, authors, audio, photo, details, imdb, youtube};


            const idAuthor = req.get("idAuthor") as unknown as number;
            const lastName = req.get("lastName") as string;
            const firstName = req.get("firstName") as string;
            const birthDate = req.get("birthDate") as unknown as Date;

            const author: Author = {id : idAuthor, firstName: firstName, lastName: lastName, birthDate: birthDate};

            await BookService.removeAuthor(book ,author);
            res.end();
        } catch(err) {
            next(err)
        }

    }
}