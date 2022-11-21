import {Author} from "../interface/interfaces";
import {AuthorModel} from "../database/models";
import {Mop} from "../mop/mop";

export class AuthorService {
    static async getAuthor(id: number):Promise<Author>{
        Mop.startCall("The monitor for getAuthor method from AuthorService is called with: " + id);
        const result = (await AuthorModel.findOne({
            where: {
                id: id,
            }
        }))?.toJSON() as Author;
        Mop.endCall(result);
        return result;
    }
    static async addAuthor(author: Author): Promise<void> {
        Mop.startCall("The monitor for addAuthor method from AuthorService is called with: " + author);
        delete author.id;

        await AuthorModel.create(   {
            ...author
        })

        Mop.endCall(true);
    }

    static async editAuthor(author: Author): Promise<void> {
        Mop.startCall("The monitor for editAuthor method from AuthorService is called with: " + author);
        await AuthorModel.create({
            ...author
        })

        Mop.endCall(true);
    }

    static async deleteAuthor(author: Author): Promise<void> {
        Mop.startCall("The monitor for deleteAuthor method from AuthorService is called with: " + author);
        await AuthorModel.destroy({
            where: {
                id: author.id
            }
        })

        Mop.endCall(true);
    }
}