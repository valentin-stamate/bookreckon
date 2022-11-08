import { Utils } from "sequelize";
import {UserController} from "../controller/user.controller";
import {MOCK_USER} from "./mocked/mock";

const mockedEnd = jest.fn(() => Promise.resolve());
const mockedResponse = {
    end: mockedEnd,
};

describe('User controller tests', function () {

    test('user credential confirm - working', async () => {
        const mockReq = jest.fn();
        mockReq(MOCK_USER);
        const result = UserController.verifyCredentials(mockReq as any, mockedResponse as any, null as any);
        await expect(mockReq).toHaveBeenCalledTimes(1);
        await expect(mockReq).toHaveBeenCalledWith(MOCK_USER);
        result.then(async function(res){
            await expect(res).toBe(true);
        })
    });

    // test('get user controller', async () => {
    //     const mockReq = jest.fn();
    //     mockReq(MOCK_USER);
    //     const result = UserController.getUser(mockReq as any, mockedResponse as any, null as any);
    //     await expect(mockReq).toHaveBeenCalledTimes(1);
    //     await expect(mockReq).toHaveBeenCalledWith(MOCK_USER);
    //     result.then(async function(res){
    //         await expect(res).toBe(MOCK_USER);
    //     })
    // });

});

