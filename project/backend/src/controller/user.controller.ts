import {NextFunction, Request, Response} from "express";

export class UserController {

    static async getCoordinatorFiles(req: Request<any>, res: Response, next: NextFunction) {
        res.end();
    }
}