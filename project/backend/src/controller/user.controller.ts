import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../const/const";
import {UserService} from "../service/user.service";
import {Preference, User} from "../interface/interfaces";

export class UserController {

    static async getCoordinatorFiles(req: Request<any>, res: Response, next: NextFunction) {
        res.end();
    }

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
            const id = req.get("id") as unknown as number;

            await UserService.getUser(id);
            res.end();
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
            const id = req.get("id") as unknown as number;
            const username = req.get("username") as string;
            const email = req.get("email") as string;
            const password = req.get("password") as string;
            const preferences = req.get("preferences") as unknown as string[];

            await UserService.addUser({id, username, email, password, preferences});
            res.end();
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
            const id = req.get("id") as unknown as number;
            const username = req.get("username") as string;
            const email = req.get("email") as string;
            const password = req.get("password") as string;
            const preferences = req.get("preferences") as unknown as string[];

            const user: User = {id, username, email, password, preferences};
            const db_user: User = await UserService.getUser(id);
            if (user.username != db_user.username ||
                user.email != db_user.email ||
                user.password != db_user.password ||
                user.preferences != db_user.preferences
            ){
                await UserService.addUser({id, username, email, password, preferences});
            }
            res.end();
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
            const id = req.get("id") as unknown as number;

            await UserService.deleteUser(await UserService.getUser(id));
            res.end();
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
            const id = req.get("id") as unknown as number;
            const preferenceID = req.get("preferenceID") as unknown as number;
            const preferenceName = req.get("preferenceName") as string;

            const preference: Preference = {id : preferenceID, name: preferenceName};

            await UserService.addPreference(await UserService.getUser(id), preference);
            res.end();
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
            const id = req.get("id") as unknown as number;
            const preferenceID = req.get("preferenceID") as unknown as number;
            const preferenceName = req.get("preferenceName") as string;

            const preference: Preference = {id : preferenceID, name: preferenceName};

            await UserService.removePreference(await UserService.getUser(id), preference);
            res.end();
        } catch(err) {
            next(err)
        }

    }


}