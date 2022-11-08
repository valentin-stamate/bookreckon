import {NextFunction, Request, Response} from "express";
import {DemoService} from "../service/demo.service";
import {ContentType, RequestHeaders} from "../const/const";

export class DemoController {

    static async demoControllerMethod(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const message = body.message || 'Hello world!';

        try {
            const result = await DemoService.demoServiceMethod(message);

            res.setHeader(RequestHeaders.CONTENT_TYPE, ContentType.JSON);
            res.end(JSON.stringify(result));
        } catch (err) {
            next(err);
        }
    }

}