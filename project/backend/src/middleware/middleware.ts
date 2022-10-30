import {NextFunction, Request, Response,} from "express";
import {ContentType, StatusCode} from "../const/const";

export class Middleware {

    /** The middleware that handles all the exceptions thrown by the app */
    static errorHandler(err: ResponseError, req: Request<any>, res: Response, next: NextFunction) {
        let statusError = 500;

        if (err.status !== undefined) {
            statusError = err.status;
        }

        console.log(err);
        res.setHeader('Content-Type', ContentType.TEXT);
        res.status(statusError).send(err.message);
    }
}

export class ResponseError extends Error {
    constructor(public message: string, public status: StatusCode = StatusCode.INTERNAL_SERVER_ERROR) {
        super(message);
    }
}