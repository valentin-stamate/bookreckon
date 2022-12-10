import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {ContentType, Headers, ResponseMessage, StatusCode} from "../const/const";
import {UserService} from "../service/user.service";
import {User} from "../interface/interfaces";
import {JwtService} from "../service/jwt.service";
import { LogAspect } from "../aop/log";
import { afterMethod, beforeMethod, onException } from "kaop-ts";

export class UserController {

    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async getUserInfo(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get(Headers.AUTHORIZATION);
        const user = JwtService.verifyToken(token as string) as User;

        try{
            const result = await UserService.getUserInfo(user.id as number);
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }
    }

    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async loginUser(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body as User;

        try {
            const token = await UserService.loginUser(body);

            res.setHeader(Headers.CONTENT_TYPE, ContentType.TEXT);
            res.end(token);
        } catch (err) {
            next(err);
        }
    }

    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async signupUser(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body as User;

        try {
            const token = await UserService.signupUser(body);

            res.setHeader(Headers.CONTENT_TYPE, ContentType.TEXT);
            res.end(token);
        } catch (err) {
            next(err);
        }
    }

    static async editUserPreference(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const genres = body.genres;
        const sentiments = body.sentiments;

        try {
            if (genres === null || sentiments === null) {
                throw new ResponseError(ResponseMessage.COMPLETE_ALL_FIELDS, StatusCode.BAD_REQUEST);
            }

            await UserService.updatePreferences(genres, sentiments);

            res.end();
        } catch (err) {
            next(err);
        }

    }


}