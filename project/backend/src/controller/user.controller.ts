import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../const/const";
import {UserService} from "../service/user.service";
import {Preference, User} from "../interface/interfaces";

export class UserController {

    static async verifyCredentials(req: Request<any>, res: Response, next: NextFunction) {
        return true;
    }

    //getUser
    static async getUser(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.preferences == null){
            next(new ResponseError("Invalid form : Get user",  StatusCode.BAD_REQUEST));
            return;
        }

        try{
            const id = Number(body.id) as number;

            const result = await UserService.getUser(id);
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }

    //addUser

    static async addUser(req: Request<any>, res: Response, next: NextFunction){
        const body = req.body;

        if (body.id == null || body.username != null || body.password != null){
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

            const preference: Preference = {id : preferenceID, name: preferenceName};

            const result = await UserService.addPreference(await UserService.getUser(id), preference);
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }

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

            const preference: Preference = {id : preferenceID, name: preferenceName};

            const result = await UserService.removePreference(await UserService.getUser(id), preference);
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }


}