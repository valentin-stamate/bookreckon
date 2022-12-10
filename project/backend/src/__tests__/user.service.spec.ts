import {UserService} from "../service/user.service";
import {PreferenceModel, UserModel} from "../database/models";
import {MOCK_USER} from "./mocked/mock";

jest.mock('../database/models');

const mockedUserModel = jest.mocked(UserModel);
const mockedPreferenceModel = jest.mocked(PreferenceModel);

const userFindOneMock = jest.fn(() => Promise.resolve());
const userCreateMock = jest.fn(() => Promise.resolve());
const userDestroyMock = jest.fn(() => Promise.resolve());
// const userAddPreferenceDestroyMock = jest.fn(() => Promise.resolve());

// const preferenceFindOneMock = jest.fn(() => Promise.resolve());

const userFindOneSpy = jest
    .spyOn(UserModel, 'findOne')
    .mockImplementation(userFindOneMock as any);
const userCreateSpy = jest
    .spyOn(UserModel, 'create')
    .mockImplementation(userCreateMock as any);
const userDestroySpy = jest
    .spyOn(UserModel, 'destroy')
    .mockImplementation(userDestroyMock as any);

// UserModel['addPreferenceModel'] = jest.fn();
// const userAddPreferenceDestroySpy = jest
//     .spyOn(UserModel, 'addPreferenceModel')
//     .mockImplementation(userAddPreferenceDestroyMock as any);

// const preferenceFindOneSpy = jest
//     .spyOn(PreferenceModel, 'findOne')
//     .mockImplementation(preferenceFindOneMock as any);
//
// mockedUserModel.mockImplementation(() => {
//     return {
//         findOne: userFindOneMock,
//     } as any;
// });

describe('User service tests', function () {

    test('Get user', async () => {
        const result = UserService.getUserInfo(1);

        await expect(result).resolves.not.toThrow();
        expect(userFindOneSpy).toHaveBeenCalled();
    });

    test('Add user', async () =>{
        const result = UserService.addUser(MOCK_USER);

        await expect(result).resolves.not.toThrow();
        expect(userCreateSpy).toHaveBeenCalled();
    })

    test('Edit user', async  () =>{
        const result = UserService.editUser(MOCK_USER);

        const mockUserWithoutId = {...MOCK_USER};
        delete mockUserWithoutId.id;

        await expect(result).resolves.not.toThrow();
        expect(userCreateSpy).toHaveBeenCalledWith(mockUserWithoutId);
    })

    test("Delete user", async ()=>{
        const result = UserService.deleteUser(MOCK_USER);

        await expect(result).resolves.not.toThrow();
        expect(userDestroySpy).toHaveBeenCalled();
    })

    // Reason: The method createPreferenceModel and addPreferenceModel are added at runtime, so jest doesn't sees them
    // test("addPreferences", async () => {
    //     const result = UserService.addPreference(MOCK_USER, MOCK_PREFERENCE)
    //
    //     await expect(result).resolves.not.toThrow();
    //     expect(userFindOneSpy).toHaveBeenCalled();
    //     expect(preferenceFindOneSpy).toHaveBeenCalled();
    //     expect(userAddPreferenceDestroySpy).toHaveBeenCalled();
    // })
    //
    // test("removePreferences", async ()=>{
    //     const result = UserService.removePreference(MOCK_USER, MOCK_PREFERENCE)
    //
    //     await expect(result).resolves.not.toThrow();
    //     expect(userFindOneSpy).toHaveBeenCalled();
    //     expect(preferenceFindOneSpy).toHaveBeenCalled();
    // })
});