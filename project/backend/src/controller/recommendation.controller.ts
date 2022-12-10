import {afterMethod, beforeMethod, onException} from "kaop-ts";
import {LogAspect} from "../aop/log";
import {NextFunction, Request, Response} from "express";
import {Headers} from "../const/const";
import {JwtService} from "../service/jwt.service";
import {User} from "../interface/interfaces";
import {RecommendationService} from "../service/recommendation.service";

export class RecommendationController {
    @beforeMethod(LogAspect.logBefore)
    @afterMethod(LogAspect.logAfter)
    @onException(LogAspect.logException)
    static async getRecommendations(req: Request<any>, res: Response, next: NextFunction){
        const token = req.get(Headers.AUTHORIZATION) as string;
        const user = JwtService.verifyToken(token) as User;
        const userId = user.id as number;

        try{
            const result = await RecommendationService.getRecommendations(userId);
            res.end(JSON.stringify(result));
        } catch(err) {
            next(err)
        }

    }
}