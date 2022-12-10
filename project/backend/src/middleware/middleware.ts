import {NextFunction, Request, Response,} from "express";
import {ContentType, Headers, ResponseMessage, StatusCode} from "../const/const";
import {JwtService} from "../service/jwt.service";
import {User} from "../interface/interfaces";
import {UserService} from "../service/user.service";

export class Middleware {

    /** Middleware for unauthorized users. In this case every request can pass. */
    static async visitorMiddleware(req: Request<any>, res: Response, next: NextFunction) {
        res.setHeader(Headers.CONTENT_TYPE, ContentType.JSON);
        next();
    }

    /** Middleware for authorized users. In order for the request to pass the user should exist. */
    static async userMiddleware(req: Request<any>, res: Response, next: NextFunction) {
        res.setHeader(Headers.CONTENT_TYPE, ContentType.JSON);

        try {
            const token = req.get(Headers.AUTHORIZATION);

            if (token == null) {
                next(new ResponseError(ResponseMessage.NO_AUTH_TOKEN, StatusCode.UNAUTHORIZED));
                return;
            }

            const user = JwtService.verifyToken(token) as User;

            if (user == null) {
                next(new ResponseError(ResponseMessage.INVALID_AUTHORIZATION_TOKEN, StatusCode.UNAUTHORIZED));
                return;
            }

            const existingUser = await UserService.getUserInfo(user.id as number);

            if (existingUser == null) {
                next(new ResponseError(ResponseMessage.NOT_FOUND, StatusCode.NOT_FOUND));
                return;
            }

            next();
        } catch (err) {
            console.log(err);
        }
    }

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