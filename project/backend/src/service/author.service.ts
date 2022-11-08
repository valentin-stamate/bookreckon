import {Author} from "../interface/interfaces";
import {AuthorModel} from "../database/models";

export class AuthorService {
    static async getAuthor(id: number):Promise<Author>{
        return (await AuthorModel.findOne({
            where: {
                id: id,
            }
        }))?.toJSON() as Author;
    }
    static async addAuthor(author: Author): Promise<void> {
        delete author.id;

        await AuthorModel.create({
            ...author
        })
    }

    static async editAuthor(author: Author): Promise<void> {
        await AuthorModel.create({
            ...author
        })
    }

    static async deleteAuthor(author: Author): Promise<void> {
        await AuthorModel.destroy({
            where: {
                id: author.id
            }
        })
    }
}