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

    static async checkIfUserExistsById(id: number): Promise<boolean> {
        const foundUser = await UserModel.findOne({
            where: {
                id: id,
            }
        });

        return foundUser != null;
    }

    static async checkIfPreferenceExistsById(id: Number): Promise<boolean>{
        const foundPreference = await PreferenceModel.findOne({
            where: {
                id: id,
            }
        });

        return foundPreference != null;
    }

    static async loginUser(user: User) {
        if (user.username == null || user.password == null || user.username == '' || user.password == '') {
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
        if (user.username == null || user.email == null || user.password == null || user.username == '' || user.email == '' || user.password == '') {
            throw new ResponseError(ResponseMessage.COMPLETE_ALL_FIELDS, StatusCode.BAD_REQUEST);
        }

        const userModel = await UserModel.findOne({
            where: {
                username: user.username,
            }
        });

        if (userModel != null) {
            throw new ResponseError(ResponseMessage.DUPLICATE_USER, StatusCode.CONFLICT);
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
        await UserModel.update({
                ...user
            },
            {where: {id: user.id}});
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
                name: preference.title,
            }
        });

        // @ts-ignore
        userModel.addPreferenceModel(preferenceModel); //TODO: fix
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
                name: preference.title,
            }
        });


        // @ts-ignore
        userModel.destroyPreferenceModel(preferenceModel); //TODO: fix
    }

}