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
            const id = Number(body.id) as number;

            const result = await BookService.getBook(id);
            res.end(JSON.stringify(result));
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
            const id = Number(body.id) as number;
            const name = body.name as string;
            const genre = body.genre as string;
            const authors = body.authors as Author[];
            const audio = body.audio as Buffer;
            const photo = body.photo as string;
            const details = body.details as string;
            const imdb = body.imdb as string;
            const youtube = body.youtube as string;

            const result = await BookService.addBook({id: id, name: name, genre: genre, authors: authors, audio: audio, photo: photo, details: details, imdb: imdb, youtube: youtube});
            res.end(JSON.stringify(result));
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
            const id = Number(body.id) as number;
            const name = body.name as string;
            const genre = body.genre as string;
            const authors = body.authors as Author[];
            const audio = body.audio as Buffer;
            const photo = body.photo as string;
            const details = body.details as string;
            const imdb = body.imdb as string;
            const youtube = body.youtube as string;

            const book: Book = {id: id, name: name, genre: genre, authors: authors, audio: audio, photo: photo, details: details, imdb: imdb, youtube: youtube};
            const db_book: Book = await BookService.getBook(id);

            const result = await BookService.editBook(book);

            res.end(JSON.stringify(result));
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
                const id = Number(body.id) as number;

            const result = await BookService.deleteBook(await BookService.getBook(id));
            res.end(JSON.stringify(result));
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
            const id = Number(body.id) as number;
            const name = body.name as string;
            const genre = body.genre as string;
            const authors = body.authors as Author[];
            const audio = body.audio as Buffer;
            const photo = body.photo as string;
            const details = body.details as string;
            const imdb = body.imdb as string;
            const youtube = body.youtube as string;

            const book: Book = {id: id, name: name, genre: genre, authors: authors, audio: audio, photo: photo, details: details, imdb: imdb, youtube: youtube};


            const idAuthor = Number(body.idAuthor) as number;
            const lastName = body.lastName as string;
            const firstName = body.firstName as string;
            const birthDate = body.birthDate as Date;

            const author: Author = {id : idAuthor, firstName: firstName, lastName: lastName, birthDate: birthDate};

            const result = await BookService.addAuthor(book ,author);
            res.end(JSON.stringify(result));
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
            const id = Number(body.id) as number;
            const name = body.name as string;
            const genre = body.genre as string;
            const authors = body.authors as Author[];
            const audio = body.audio as Buffer;
            const photo = body.photo as string;
            const details = body.details as string;
            const imdb = body.imdb as string;
            const youtube = body.youtube as string;

            const book: Book = {id: id, name: name, genre: genre, authors: authors, audio: audio, photo: photo, details: details, imdb: imdb, youtube: youtube};


            const idAuthor = Number(body.idAuthor) as number;
            const lastName = body.lastName as string;
            const firstName = body.firstName as string;
            const birthDate = body.birthDate as Date;

            const author: Author = {id : idAuthor, firstName: firstName, lastName: lastName, birthDate: birthDate};

            const result = await BookService.removeAuthor(book ,author);
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }
}