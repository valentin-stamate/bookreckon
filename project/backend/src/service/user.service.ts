import {Preference, User} from "../interface/interfaces";
import {BookModel, PreferenceModel, UserModel} from "../database/models";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../const/const";
import {JwtService} from "./jwt.service";
import {Mop} from "../mop/mop";

export class UserService {

    static async getUser(id: number): Promise<User> {
        Mop.startCall("The monitor for getUser method from UserService is called with: " + id);
        const result = (await UserModel.findOne({
            where: {
                id: id,
            },
            include: BookModel,
        }))?.toJSON() as User;
        Mop.endCall(result);
        return result;
    }

    static async loginUser(user: User) {
        Mop.startCall("The monitor for loginUser method from UserService is called with: " + user);
        if (user.username == null || user.password == null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.BAD_REQUEST);
        }

        const userModel = await UserModel.findOne({
            where: {
                username: user.username,
            }
        });

        Mop.endCall(userModel);

        if (userModel == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        return JwtService.generateAccessTokenForStudent(userModel.toJSON());
    }

    static async signupUser(user: User) {
        Mop.startCall("The monitor for signupUser method from UserService is called with: " + user);
        if (user.username == null || user.email == null || user.password == null) {
            throw new ResponseError(ResponseMessage.COMPLETE_ALL_FIELDS, StatusCode.BAD_REQUEST);
        }

        const newUser = {
            username: user.username,
            email: user.email,
            password: user.password,
        }

        await UserModel.create(newUser);

        Mop.endCall(newUser);

        return JwtService.generateAccessTokenForStudent(newUser as User);
    }

    static async addUser(user: User): Promise<void> {
        Mop.startCall("The monitor for addUser method from UserService is called with: " + user);
        delete user.id;

        await UserModel.create({
            ...user
        });

        Mop.endCall(true);
    }

    static async editUser(user: User): Promise<void> {
        Mop.startCall("The monitor for editUser method from UserService is called with: " + user);
        await UserModel.create({
            ...user
        });

        Mop.endCall(true);
    }

    static async deleteUser(user: User): Promise<void> {
        Mop.startCall("The monitor for deleteUser method from UserService is called with: " + user);
        await UserModel.destroy({
            where: {
                id: user.id,
            }
        });

        Mop.endCall(true);
    }

    static async addPreference(user: User, preference: Preference): Promise<void> {
        Mop.startCall("The monitor for addPreference method from UserService for user and preference is called with: " + {user, preference});
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

        Mop.endCall({userModel, preferenceModel});

        // @ts-ignore
        userModel.addPreferenceModel(preferenceModel);
    }

    static async removePreference(user: User, preference: Preference): Promise<void> {
        Mop.startCall("The monitor for addPreference method from UserService for user and preference is called with: " + {user, preference});
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

        Mop.endCall({userModel, preferenceModel});

        // @ts-ignore
        userModel.destroyPreferenceModel(preferenceModel);
    }

}