import {User} from "../interface/interfaces";
import jwt from 'jsonwebtoken';

require('dotenv').config();
const env = process.env as any;

export class JwtService {

    static generateAccessTokenForStudent(user: User) {
        return jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
            },
            env.TOKEN_SECRET);
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, env.TOKEN_SECRET);
        } catch (e) {
            return null;
        }
    }

}