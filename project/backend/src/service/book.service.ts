import {Book} from "../interface/interfaces";
import {Mop} from "../mop/mop";
import {PrismaClient} from '@prisma/client'
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../const/const";

export class BookService {

    private static prismaClient = new PrismaClient();

    static async getBook(id: number): Promise<Book>{
        Mop.startCall("The monitor for getBook method from BookService is called with: " + id);
        const result = await this.prismaClient.book.findFirst({
            where: {
                id: id,
            }
        });

        if (result == null) {
            throw new ResponseError(ResponseMessage.NOT_FOUND, StatusCode.NOT_FOUND);
        }

        Mop.endCall(result);
        return result;
    }

    static async addBook(book: Book): Promise<void> {
        Mop.startCall("The monitor for addBook method from BookService is called with: " + book);
        delete book.id;

        await this.prismaClient.book.create({
            data: book,
        });

        Mop.endCall(true);
    }
}