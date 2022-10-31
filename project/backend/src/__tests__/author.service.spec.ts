import {AuthorService} from "../service/author.service";
import {MOCK_AUTHOR} from "../const/const";


describe('Author service tests', function () {

    test('Get author', async () => {
        const result = AuthorService.getAuthor();
        await expect(result).resolves.not.toThrow();
    });

    test('Add author', async () =>{
        const result = AuthorService.addAuthor(MOCK_AUTHOR);
        await expect(result).resolves.not.toThrow();
    })

    test('Edit author', async  () =>{
        const result = AuthorService.editAuthor(MOCK_AUTHOR);
        await expect(result).resolves.not.toThrow();
    })

    test("Delete author", async ()=>{
        const result = AuthorService.deleteAuthor(MOCK_AUTHOR);
        await expect(result).resolves.not.toThrow();
    })
});