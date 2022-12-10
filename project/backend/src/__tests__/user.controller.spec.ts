import { Utils } from "sequelize";
import {UserController} from "../controller/user.controller";
import {
    MOCK_NEXT,
    MOCK_REQUEST_ID_NULL,
    MOCK_REQUEST_ID_NULL_PREFERENCES,
    MOCK_REQUEST_PASSWORD_NULL,
    MOCK_REQUEST_PREFERENCE_ID_NULL_PREFERENCES,
    MOCK_REQUEST_PREFERENCE_NAME_NULL_PREFERENCES,
    MOCK_REQUEST_PREFERENCES,
    MOCK_REQUEST_PREFERENCES_NULL,
    MOCK_REQUEST_USER,
    MOCK_REQUEST_USERNAME_NULL,
    MOCK_RESPONSE,
    MOCK_USER
} from "./mocked/mock";
import {UserService} from "../service/user.service";

jest.mock('../service/user.service');
const userServiceGetUserSpy = jest
    .spyOn(UserService, 'getUserInfo')
    .mockImplementation(jest.fn(() => Promise.resolve()) as any);


jest.mock('../service/user.service');
const userServiceAddUserSpy = jest
    .spyOn(UserService, 'addUser')
    .mockImplementation(jest.fn(() => Promise.resolve()) as any);

jest.mock('../service/user.service');
const userServiceEditUserSpy = jest
    .spyOn(UserService, 'editUser')
    .mockImplementation(jest.fn(() => Promise.resolve()) as any);

jest.mock('../service/user.service');
const userServiceDeleteUserSpy = jest
    .spyOn(UserService, 'deleteUser')
    .mockImplementation(jest.fn(() => Promise.resolve()) as any);


jest.mock('../service/user.service');
const userServiceAddPreferenceSpy = jest
    .spyOn(UserService, 'addPreference')
    .mockImplementation(jest.fn(() => Promise.resolve()) as any);


jest.mock('../service/user.service');
const userServiceRemovePreferenceSpy = jest
    .spyOn(UserService, 'removePreference')
    .mockImplementation(jest.fn(() => Promise.resolve()) as any);


const mockedEnd = jest.fn(() => Promise.resolve());
const mockedResponse = {
    end: mockedEnd,
};



describe('User controller tests', function () {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should throw an error when body id is null', async () => {
        await UserController.getUserInfo(MOCK_REQUEST_ID_NULL, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceGetUserSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('should throw an error when body preferences is null', async () => {
        await UserController.getUserInfo(MOCK_REQUEST_PREFERENCES_NULL, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceGetUserSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('should call res end when body is valid', async () => {
        await UserController.getUserInfo(MOCK_REQUEST_USER, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).not.toHaveBeenCalled();
        expect(userServiceGetUserSpy).toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).toHaveBeenCalled();
    });

    /**
     * tests for add user
     */

    test('adduser - should throw an error when body id is null', async () => {
        await UserController.addUser(MOCK_REQUEST_ID_NULL, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceAddUserSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('adduser - should throw an error when body username is null', async () => {
        await UserController.addUser(MOCK_REQUEST_USERNAME_NULL, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceAddUserSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('adduser - should throw an error when body password is null', async () => {
        await UserController.addUser(MOCK_REQUEST_PASSWORD_NULL, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceAddUserSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('add user - should call res end when body is valid', async () => {
        await UserController.addUser(MOCK_REQUEST_USER, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).not.toHaveBeenCalled();
        expect(userServiceAddUserSpy).toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).toHaveBeenCalled();
    });

    /**
     * editUser
     */

    test('edit user - should throw an error when body id is null', async () => {
        await UserController.editUser(MOCK_REQUEST_ID_NULL, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceEditUserSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('edit user - should call res end when body is valid', async () => {
        await UserController.editUser(MOCK_REQUEST_USER, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).not.toHaveBeenCalled();
        expect(userServiceEditUserSpy).toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).toHaveBeenCalled();
    });

    /**
     * delete user tests
     */

    test('delete user - should throw an error when body id is null', async () => {
        await UserController.deleteUser(MOCK_REQUEST_ID_NULL, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceDeleteUserSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('delete user - should call res end when body is valid', async () => {
        await UserController.deleteUser(MOCK_REQUEST_USER, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).not.toHaveBeenCalled();
        expect(userServiceDeleteUserSpy).toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).toHaveBeenCalled();
    });

    /**
     * add Preferences
     */

    test('add preferences - should throw an error when body id is null', async () => {
        await UserController.addPreference(MOCK_REQUEST_ID_NULL_PREFERENCES, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceAddPreferenceSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('add preference - should throw an error when body username is null', async () => {
        await UserController.addPreference(MOCK_REQUEST_PREFERENCE_ID_NULL_PREFERENCES, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceAddPreferenceSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('add preference - should throw an error when body password is null', async () => {
        await UserController.addPreference(MOCK_REQUEST_PREFERENCE_NAME_NULL_PREFERENCES, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceAddPreferenceSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('add preference - should call res end when body is valid', async () => {
        await UserController.addPreference(MOCK_REQUEST_PREFERENCES, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).not.toHaveBeenCalled();
        expect(userServiceGetUserSpy).toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).toHaveBeenCalled();
    });

    /**
     * delete Preferences
     */

    test('remove preferences - should throw an error when body id is null', async () => {
        await UserController.removePreference(MOCK_REQUEST_ID_NULL_PREFERENCES, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceRemovePreferenceSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('remove preference - should throw an error when body username is null', async () => {
        await UserController.removePreference(MOCK_REQUEST_PREFERENCE_ID_NULL_PREFERENCES, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceRemovePreferenceSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('remove preference - should throw an error when body password is null', async () => {
        await UserController.removePreference(MOCK_REQUEST_PREFERENCE_NAME_NULL_PREFERENCES, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceRemovePreferenceSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('remove preference - should call res end when body is valid', async () => {
        await UserController.removePreference(MOCK_REQUEST_PREFERENCES, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).not.toHaveBeenCalled();
        expect(userServiceRemovePreferenceSpy).toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).toHaveBeenCalled();
    });

});

