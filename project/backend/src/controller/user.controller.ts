import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {ContentType, Headers, ResponseMessage, StatusCode} from "../const/const";
import {UserService} from "../service/user.service";
import {Preference, User} from "../interface/interfaces";
import {JwtService} from "../service/jwt.service";
import {UserModel} from "../database/models";
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
            const result = await UserService.getUser(user.id as number);
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

    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async addUser(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.username == null || body.password == null){
            next(new ResponseError("Invalid form : Add user",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = Number(body.id) as number;
            const username = body.username as string;
            const email = body.email as string;
            const password = body.password as string;
            const preferences = body.preferences as string[];

            const result = await UserService.addUser({id: id, username: username, email: email, password: password, preferences: preferences});
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }

    //editUser
    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async editUser(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null){
            next(new ResponseError("Invalid form : Edit user",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = Number(body.id) as number;
            const username = body.username as string;
            const email = body.email as string;
            const password = body.password as string;
            const preferences = body.preferences as string[];

            const user: User = {id: id, username: username, email: email, password: password, preferences: preferences};

            const result = await UserService.editUser(user);

            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }

    //deleteUser
    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async deleteUser(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null){
            next(new ResponseError("Invalid form : Delete user",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = Number(body.id) as number;

            const result = await UserService.deleteUser(await UserService.getUser(id));
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }

    //addPreference
    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async addPreference(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.preferenceID == null || body.preferenceName == null){
            next(new ResponseError("Invalid form : Add preference to user",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = Number(body.id) as number;
            const preferenceID = Number(body.preferenceID) as number;
            const preferenceName = body.preferenceName as string;

            const preference: Preference = {id : preferenceID, title: preferenceName};

            const result = await UserService.addPreference(await UserService.getUser(id), preference);
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }

    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async removePreference(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.preferenceID == null || body.preferenceName == null){
            next(new ResponseError("Invalid form : Delete preference to user",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = Number(body.id) as number;
            const preferenceID = Number(body.preferenceID) as number;
            const preferenceName = body.preferenceName as string;

            const preference: Preference = {id : preferenceID, title: preferenceName};

            const result = await UserService.removePreference(await UserService.getUser(id), preference);
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }


}