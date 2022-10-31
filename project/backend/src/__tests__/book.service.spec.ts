import {BookService} from "../service/book.service";
import {MOCK_BOOK, MOCK_AUTHOR} from "../const/const";


describe('Book service tests', function () {

    test('Get book', async () => {
        const result = BookService.getBook();
        await expect(result).resolves.not.toThrow();
    });

    test('Add book', async () =>{
        const result = BookService.addBook(MOCK_BOOK);
        await expect(result).resolves.not.toThrow();
    })

    test('Edit book', async  () =>{
        const result = BookService.editBook(MOCK_BOOK);
        await expect(result).resolves.not.toThrow();
    })

    test("Delete book", async ()=>{
        const result = BookService.deleteBook(MOCK_BOOK);
        await expect(result).resolves.not.toThrow();
    })

    test("addAuthors", async ()=>{
        const result = BookService.addAuthor(MOCK_BOOK, MOCK_AUTHOR)
        await expect(MOCK_BOOK.authors).toBe([MOCK_AUTHOR])
    })

    test("removeAuthors", async ()=>{
        const result = BookService.removeAuthor(MOCK_BOOK, MOCK_AUTHOR)
        await expect(MOCK_BOOK.authors).toBe([])
    })
});
