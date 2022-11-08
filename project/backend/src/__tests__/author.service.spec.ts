import {AuthorService} from "../service/author.service";
import {MOCK_AUTHOR} from "./mocked/mock";
import {AuthorModel} from "../database/models";


const authorFindOneMock = jest.fn(() => Promise.resolve());
const authorCreateMock = jest.fn(() => Promise.resolve());
const authorDestroyMock = jest.fn(() => Promise.resolve());

const authorFindOneSpy = jest.spyOn(AuthorModel, 'findOne').mockImplementation(authorFindOneMock as any);
const authorCreateSpy = jest.spyOn(AuthorModel, 'create').mockImplementation(authorCreateMock as any);
const authorDestroySpy = jest.spyOn(AuthorModel, 'destroy').mockImplementation(authorDestroyMock as any);


describe('Author service tests', function () {

    test('Get author', async () => {
        const result = AuthorService.getAuthor(1);
        await expect(result).resolves.not.toThrow();
        expect(authorFindOneSpy).toHaveBeenCalled();
    });

    test('Add author', async () =>{
        const result = AuthorService.addAuthor(MOCK_AUTHOR);
        await expect(result).resolves.not.toThrow();
        expect(authorCreateSpy).toHaveBeenCalled();
    })

    test('Edit author', async  () =>{
        const result = AuthorService.editAuthor(MOCK_AUTHOR);
        const mockAuthorWithoutId = {...MOCK_AUTHOR}
        delete mockAuthorWithoutId.id;
        await expect(result).resolves.not.toThrow();
        expect(authorCreateSpy).toHaveBeenCalled();
    })

    test("Delete author", async ()=>{
        const result = AuthorService.deleteAuthor(MOCK_AUTHOR);
        await expect(result).resolves.not.toThrow();
        expect(authorDestroySpy).toHaveBeenCalled();
    })
});