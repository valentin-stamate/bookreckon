import {Preference, User} from "../interface/interfaces";
import {BookModel, PreferenceModel, UserModel} from "../database/models";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../const/const";
import {JwtService} from "./jwt.service";

export class UserService {

    static async getUser(id: number): Promise<User> {
        return (await UserModel.findOne({
            where: {
                id: id,
            },
            include: BookModel,
        }))?.toJSON() as User;
    }

    static async loginUser(user: User) {
        if (user.username == null || user.password == null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.BAD_REQUEST);
        }

        const userModel = await UserModel.findOne({
            where: {
                username: user.username,
            }
        });

        if (userModel == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        return JwtService.generateAccessTokenForStudent(userModel.toJSON());
    }

    static async signupUser(user: User) {
        if (user.username == null || user.email == null || user.password == null) {
            throw new ResponseError(ResponseMessage.COMPLETE_ALL_FIELDS, StatusCode.BAD_REQUEST);
        }

        const newUser = {
            username: user.username,
            email: user.email,
            password: user.password,
        }

        await UserModel.create(newUser);

        return JwtService.generateAccessTokenForStudent(newUser as User);
    }

    static async addUser(user: User): Promise<void> {
        delete user.id;

        await UserModel.create({
            ...user
        });
    }

    static async editUser(user: User): Promise<void> {
        await UserModel.create({
            ...user
        });
    }

    static async deleteUser(user: User): Promise<void> {
        await UserModel.destroy({
            where: {
                id: user.id,
            }
        });
    }

    static async addPreference(user: User, preference: Preference): Promise<void> {
        const userModel = await UserModel.findOne({
            where: {
                id: user.id,
            },
            include: PreferenceModel,
        });

        const preferenceModel = await PreferenceModel.findOne({
            where: {
                name: preference.name,
            }
        });

        // @ts-ignore
        userModel.addPreferenceModel(preferenceModel);
    }

    static async removePreference(user: User, preference: Preference): Promise<void> {
        const userModel = await UserModel.findOne({
            where: {
                id: user.id,
            },
            include: PreferenceModel,
        });

        const preferenceModel = await PreferenceModel.findOne({
            where: {
                name: preference.name,
            }
        });

        // @ts-ignore
        userModel.destroyPreferenceModel(preferenceModel);
    }

}