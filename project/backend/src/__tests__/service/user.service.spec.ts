import {UserService} from "../../service/user.service"
import {MOCK_USER, MOCK_USER_NO_USERNAME} from "../mocked/mock"
import { MockContext, Context, createMockContext } from '../../context/context'
import {User} from "../../interface/interfaces";
import {ResponseError} from "../../middleware/middleware";
import {ResponseMessage, StatusCode} from "../../const/const";
import {JwtService} from "../../service/jwt.service";

describe('User service tests', function () {

    let mockCtx: MockContext
    let ctx: Context

    beforeEach(() => {
        mockCtx = createMockContext()
        ctx = mockCtx as unknown as Context
    })

    test('Create user', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.create.mockResolvedValue(MOCK_USER)
        await expect(UserService.createUser(MOCK_USER, ctx)).resolves.toEqual(MOCK_USER)
    })

    test('Get user info', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.findFirst.mockResolvedValue(MOCK_USER)
        // @ts-ignore
        await expect(UserService.getUserInfo(MOCK_USER.id, ctx)).resolves.toEqual(MOCK_USER)
    })

    test('Get user info - Not found', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.findFirst.mockRejectedValue(new ResponseError(ResponseMessage.NOT_FOUND, StatusCode.NOT_FOUND))
        // @ts-ignore
        await expect(UserService.getUserInfo(0, ctx)).rejects.toEqual(new ResponseError(ResponseMessage.NOT_FOUND, StatusCode.NOT_FOUND))
    })

    test('Login user - Not found', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.findFirst.mockRejectedValue(new ResponseError(ResponseMessage.NOT_FOUND, StatusCode.NOT_FOUND))
        await expect(UserService.loginUser(MOCK_USER, ctx)).rejects.toEqual(new ResponseError(ResponseMessage.NOT_FOUND, StatusCode.NOT_FOUND))
    })

    test('Login user - Invalid credentials', async () =>{
        await expect(UserService.loginUser(MOCK_USER_NO_USERNAME, ctx)).rejects.toEqual(new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.BAD_REQUEST))
    })


    test('Login user', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.findFirst.mockResolvedValue(MOCK_USER)
        await expect(UserService.loginUser(MOCK_USER, ctx)).not.toBeNull()
    })

    test('Signup user - Complete all fields', async () =>{
        await expect(UserService.signupUser(MOCK_USER_NO_USERNAME, ctx)).rejects.toEqual(new ResponseError(ResponseMessage.COMPLETE_ALL_FIELDS, StatusCode.BAD_REQUEST))
    })

    test('Signup user - User already exists', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.findFirst.mockResolvedValue(MOCK_USER)
        await expect(UserService.signupUser(MOCK_USER, ctx)).rejects.toEqual(new ResponseError(ResponseMessage.USER_ALREADY_EXISTS, StatusCode.BAD_REQUEST))
    })

    test('Signup user ', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.findFirst.mockReturnValue(null)
        // @ts-ignore
        mockCtx.prisma.user.create.mockResolvedValue(MOCK_USER)
        await expect(UserService.signupUser(MOCK_USER, ctx)).not.toBeNull()
    })

    test('Update preferences - user not found ', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.findFirst.mockReturnValue(null)
        // @ts-ignore
        await expect(UserService.updatePreferences(MOCK_USER.id, [], [], ctx)).rejects.toEqual(new ResponseError(ResponseMessage.NOT_FOUND, StatusCode.NOT_FOUND))
    })

    test('Update preferences', async () =>{
        // @ts-ignore
        mockCtx.prisma.user.findFirst.mockReturnValue(MOCK_USER)
        // @ts-ignore
        await expect(UserService.updatePreferences(MOCK_USER.id, [], [], ctx)).resolves
    })
});