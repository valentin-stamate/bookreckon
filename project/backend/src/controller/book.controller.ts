import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {StatusCode} from "../const/const";
import {UserService} from "../service/user.service";
import {BookService} from "../service/book.service";
import {Author, Book, Preference, User} from "../interface/interfaces";
import { LogAspect } from "../aop/log";
import { afterMethod, beforeMethod, onException } from "kaop-ts";

export class BookController{
    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
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
}