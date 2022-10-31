import {UserService} from "../service/user.service";
import {MOCK_USER} from "../const/const";


describe('User service tests', function () {

    test('Get user', async () => {
        const result = UserService.getUser();
        await expect(result).resolves.not.toThrow();
    });

    test('Add user', async () =>{
        const result = UserService.addUser(MOCK_USER);
        await expect(result).resolves.not.toThrow();
    })

    test('Edit user', async  () =>{
        const result = UserService.editUser(MOCK_USER);
        await expect(result).resolves.not.toThrow();
    })

    test("Delete user", async ()=>{
        const result = UserService.deleteUser(MOCK_USER);
        await expect(result).resolves.not.toThrow();
    })

    test("addPreferences", async ()=>{
        const result = UserService.addPreference(MOCK_USER, "romance")
        await expect(MOCK_USER.preferences).toBe(["action", "automotive","romance"])
    })

    test("removePreferences", async ()=>{
        const result = UserService.removePreference(MOCK_USER, "romance")
        await expect(MOCK_USER.preferences).toBe(["action", "automotive"])
    })
});