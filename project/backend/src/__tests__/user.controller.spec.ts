import {UserController} from "../controller/user.controller";

const mockedEnd = jest.fn(() => Promise.resolve());
const mockedResponse = {
    end: mockedEnd,
};

describe('User controller tests', function () {

    test('asd', async () => {
        const result = UserController.getCoordinatorFiles(null as any, mockedResponse as any, null as any);

        expect(mockedEnd).toHaveBeenCalledWith('Hello');
    });

});