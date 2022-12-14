import {NextFunction, Request, Response} from "express";
import {ContentType, Headers} from "../const/const";
import {UserService} from "../service/user.service";
import {User} from "../interface/interfaces";
import {JwtService} from "../service/jwt.service";
import { LogAspect } from "../aop/log";
import { afterMethod, beforeMethod, onException } from "kaop-ts";
import {Context, createContext} from '../context/context'

export class UserController {

    private static context: Context = createContext();


    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async getUserInfo(req: Request<any>, res: Response, next: NextFunction) {
        const token = req.get(Headers.AUTHORIZATION);
        const user = JwtService.verifyToken(token as string) as User;
        try{
            const result = await UserService.getUserInfo(user.id as number, this.context);
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
            const token = await UserService.loginUser(body, this.context);

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
            const token = await UserService.signupUser(body, this.context);

            res.setHeader(Headers.CONTENT_TYPE, ContentType.TEXT);
            res.end(token);
        } catch (err) {
            next(err);
        }
    }

    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async editUserPreference(req: Request<any>, res: Response, next: NextFunction) {
        const body = req.body;

        const token = req.get(Headers.AUTHORIZATION) as string;
        const user = JwtService.verifyToken(token) as User;
        const userId = user.id as number;

        const genres = body.genres;
        const sentiments = body.sentiments;

        try {
            await UserService.updatePreferences(userId, genres, sentiments, this.context);
            res.end();
        } catch (err) {
            next(err);
        }

    }
}