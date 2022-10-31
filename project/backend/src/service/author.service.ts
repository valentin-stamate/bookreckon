import {Author} from "../interface/interfaces";

export class AuthorService {
    static getAuthor():Promise<Author>{
        return Promise.reject();
    }
    static addAuthor(author: Author): Promise<void> {
        return Promise.reject();
    }

    static editAuthor(author: Author): Promise<void> {
        return Promise.reject();
    }

    static deleteAuthor(author: Author): Promise<void> {
        return Promise.reject();
    }
}