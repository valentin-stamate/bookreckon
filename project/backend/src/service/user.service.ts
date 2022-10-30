import {User} from "../interface/interfaces";

export class UserService {

    static getUser(): Promise<User> {
        return Promise.reject();
    }

    static addUser(user: User): Promise<void> {
        return Promise.reject();
    }

    static editUser(user: User): Promise<void> {
        return Promise.reject();
    }

    static deleteUser(user: User): Promise<void> {
        return Promise.reject();
    }

    static addPreference(user: User, preference: string): Promise<void> {
        return Promise.reject();
    }

    static removePreference(user: User, preference: string): Promise<void> {
        return Promise.reject();
    }

}