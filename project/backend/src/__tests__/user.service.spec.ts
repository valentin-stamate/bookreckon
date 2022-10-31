import {UserService} from "../service/user.service";
import {MockUser} from "../interface/interfaces";


describe('User service tests', function () {

    test('Get user', async () => {
        const result = UserService.getUser();

        await expect(result).resolves.not.toThrow();
    });

    test('Add user', async () =>{



        const result = UserService.addUser(MockUser);

        await expect(result).resolves.not.toThrow();
    })

    test('Edit user', async  () =>{
        const result = UserService.editUser(MockUser);

        await expect(result).resolves.not.toThrow();
    })

    test("Delete user", async ()=>{
        const result = UserService.deleteUser(MockUser);

        await expect(result).resolves.not.toThrow();
    })

    test("addPreferences", async ()=>{
        const result = UserService.addPreference(MockUser, "romance")

        await expect(MockUser.preferences).toBe(["action", "automotive","romance"])
    })

    test("removePreferences", async ()=>{
        const result = UserService.removePreference(MockUser, "romance")

        await expect(MockUser.preferences).toBe(["action", "automotive"])
    })
});