import { Utils } from "sequelize";
import {UserController} from "../controller/user.controller";
import {MOCK_NEXT, MOCK_REQUEST_USER, MOCK_RESPONSE, MOCK_USER} from "./mocked/mock";
import {UserService} from "../service/user.service";

jest.mock('../service/user.service');
const userServiceGetUserSpy = jest
    .spyOn(UserService, 'getUser')
    .mockImplementation(jest.fn(() => Promise.resolve()) as any);

const mockedEnd = jest.fn(() => Promise.resolve());
const mockedResponse = {
    end: mockedEnd,
};

const MOCK_REQUEST_ID_NULL: any = {
    body: {
        id: undefined,
        username: "Cezar",
        email: "cezarcez@outlook.com",
        password: "parola",
        preferences: ["action", "automotive"]
    },
};

describe('User controller tests', function () {

    test('should throw an error when body id is null', async () => {
        await UserController.getUser(MOCK_REQUEST_ID_NULL, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).toHaveBeenCalled();
        expect(userServiceGetUserSpy).not.toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).not.toHaveBeenCalled();
    });

    test('should call res end when body is valid', async () => {
        await UserController.getUser(MOCK_REQUEST_USER, MOCK_RESPONSE, MOCK_NEXT);

        expect(MOCK_NEXT).not.toHaveBeenCalled();
        expect(userServiceGetUserSpy).toHaveBeenCalled();
        expect(MOCK_RESPONSE.end).toHaveBeenCalled();
    });

    // test('user credential confirm - working', async () => {
    //     const mockReq = jest.fn();
    //     mockReq(MOCK_USER);
    //     const result = UserController.verifyCredentials(mockReq as any, mockedResponse as any, null as any);
    //     await expect(mockReq).toHaveBeenCalledTimes(1);
    //     await expect(mockReq).toHaveBeenCalledWith(MOCK_USER);
    //     result.then(async function(res){
    //         await expect(res).toBe(true);
    //     })
    // });
    //
    // test('user controller - get user', async () => {
    //     const mockReq = MOCK_REQUEST_USER;
    //     const result = UserController.getUser(mockReq as any, MOCK_RESPONSE as any, MOCK_NEXT as any);
    //     console.log("Aici" + result);
    //     });

});

