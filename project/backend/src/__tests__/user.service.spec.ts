import {UserService} from "../service/user.service";


describe('User service tests', function () {

    test('Get user', async () => {
        const result = UserService.getUser();

        await expect(result).resolves.not.toThrow();
    });
});