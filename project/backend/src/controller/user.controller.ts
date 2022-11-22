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
        if (body.id == null || body.username == null || body.email == null || body.password == null || body.preferences == null || body.id == '' || body.username == '' || body.email == '' || body.password == ''){
            next(new ResponseError("Invalid form : Add user",  StatusCode.BAD_REQUEST));
            return;
        }

        const isUserInDB = await UserService.checkIfUserExistsById(Number(body.id));

        try{
            if (isUserInDB) {
                throw new ResponseError(ResponseMessage.DUPLICATE_USER, StatusCode.CONFLICT);
            }
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
        const id = req.params.userId;

        if (id == null || id == ''){
            next(new ResponseError("Invalid form : Edit user",  StatusCode.BAD_REQUEST));
            return;
        }

        const isUserInDB = await UserService.checkIfUserExistsById(Number(id));

        try{
            if (!isUserInDB) {
                throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);
            }
            const idNumber = Number(id) as number;
            const userFound = await UserService.getUser(idNumber);

            let username = body.username as string;
            if(username== null || username == '')
                username = userFound.username;

            let email = body.email as string;
            if(email == null || email == '')
                email = userFound.email

            let password = body.password as string;
            if(password == null || password == '')
                password = userFound.password


            let preferences = body.preferences as string[];
            if(preferences == null || preferences.length == 0)
                preferences = userFound.preferences

            const user: User = {id: idNumber, username: username, email: email, password: password, preferences: preferences};

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
        // const urlSplit = req.url.split('/');
        // const id = urlSplit[urlSplit.length-1]
        const id = req.params.userId;

        if (id == null || id == ''){
            next(new ResponseError("Invalid form : Delete user",  StatusCode.BAD_REQUEST));
            return;
        }

        let isUserInDB = await UserService.checkIfUserExistsById(Number(id));

        try{
            if(!isUserInDB)
                throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);
            const result = await UserService.deleteUser(await UserService.getUser(Number(id)));
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
        const token = req.get(Headers.AUTHORIZATION);
        const user = JwtService.verifyToken(token as string) as User;

        if (body.preferenceId == null || body.preferenceName == null || body.preferenceId == '' || body.preferenceName == ''){
            next(new ResponseError("Invalid form : Add preference to user",  StatusCode.BAD_REQUEST));
            return;
        }

        const isUserInDB = await UserService.checkIfUserExistsById(Number(user.id));

        const isPreferenceInDB = await UserService.checkIfPreferenceExistsById(Number(body.preferenceId))

        try{
            if(!isUserInDB)
                throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);

            if(!isPreferenceInDB)
                throw new ResponseError(ResponseMessage.PREFERENCE_NOT_FOUND, StatusCode.NOT_FOUND);

            const preferenceID = Number(body.preferenceID) as number;
            const preferenceName = body.preferenceName as string;

            const preference: Preference = {id : preferenceID, title: preferenceName};

            const result = await UserService.addPreference(user, preference)
            res.end(JSON.stringify(result));
        }
        catch(err) {
            next(err)
        }
    }

    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async removePreference(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;
        const token = req.get(Headers.AUTHORIZATION);
        const user = JwtService.verifyToken(token as string) as User;

        if (body.preferenceId == null || body.preferenceName == null || body.preferenceId == '' || body.preferenceName == ''){
            next(new ResponseError("Invalid form : Add preference to user",  StatusCode.BAD_REQUEST));
            return;
        }

        const isUserInDB = await UserService.checkIfUserExistsById(Number(user.id));

        const isPreferenceInDB = await UserService.checkIfPreferenceExistsById(Number(body.preferenceId))

        try{
            if(!isUserInDB)
                throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);

            if(!isPreferenceInDB)
                throw new ResponseError(ResponseMessage.PREFERENCE_NOT_FOUND, StatusCode.NOT_FOUND);

            const preferenceID = Number(body.preferenceID) as number;
            const preferenceName = body.preferenceName as string;

            const preference: Preference = {id : preferenceID, title: preferenceName};

            const result = await UserService.removePreference(user, preference)
            res.end(JSON.stringify(result));
        }
        catch(err) {
            next(err)
        }
    }


}