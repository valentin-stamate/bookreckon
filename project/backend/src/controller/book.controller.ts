import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {StatusCode} from "../const/const";
import {BookService} from "../service/book.service";
import { LogAspect } from "../aop/log";
import { afterMethod, beforeMethod, onException } from "kaop-ts";

export class BookController{
    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async getBook(req: Request<any>, res: Response, next: NextFunction){
        const params = req.params;

        if (params.bookId == null){
            next(new ResponseError("Invalid form : Get book",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const result = await BookService.getBook(parseInt(params.bookId));

            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }
}