import {NextFunction, Request, Response} from "express";
import {DemoService} from "../service/demo.service";
import {afterMethod, beforeMethod, onException} from "kaop-ts";
import { LogAspect } from "../aop/log";
import {ContentType, Headers} from "../const/const";

export class DemoController {

    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async demoControllerMethod(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const message = body.message || 'Hello world!';

        try {
            const result = await DemoService.demoServiceMethod(message);

            res.setHeader(Headers.CONTENT_TYPE, ContentType.JSON);
            res.end(JSON.stringify(result));
        } catch (err) {
            next(err);
        }
    }

}