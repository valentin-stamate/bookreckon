import {BookService} from "../service/book.service";
import {AuthorModel, BookModel} from "../database/models";
import {MOCK_BOOK} from "./mocked/mock";

jest.mock('../database/models');

const mockedBooKModel = jest.mocked(BookModel);
const mockedAuthorModel = jest.mocked(AuthorModel);

const bookFindOneMock = jest.fn(() => Promise.resolve());
const bookCreateMock = jest.fn(() => Promise.resolve());
const bookDestroyMock = jest.fn(() => Promise.resolve());

const bookFindOneSpy = jest
    .spyOn(BookModel, 'findOne')
    .mockImplementation(bookFindOneMock as any);
const bookCreateSpy = jest
    .spyOn(BookModel, 'create')
    .mockImplementation(bookCreateMock as any);
const bookDestroySpy = jest
    .spyOn(BookModel, 'destroy')
    .mockImplementation(bookDestroyMock as any);

describe('Book service tests', function () {

    test('Get book', async () => {
        const result = BookService.getBook(1);

        await expect(result).resolves.not.toThrow();
        expect(bookFindOneSpy).toHaveBeenCalled();
    });

    test('Add book', async () =>{
        const result = BookService.addBook(MOCK_BOOK);

        await expect(result).resolves.not.toThrow();
        expect(bookCreateSpy).toHaveBeenCalled();
    })

    test('Edit book', async  () =>{
        const result = BookService.editBook(MOCK_BOOK);

        const mockBookWithoutId = {...MOCK_BOOK};
        delete mockBookWithoutId.id;

        await expect(result).resolves.not.toThrow();
        expect(bookCreateSpy).toHaveBeenCalledWith(mockBookWithoutId);
    })

    test("Delete book", async ()=>{
        const result = BookService.deleteBook(MOCK_BOOK);

        await expect(result).resolves.not.toThrow();
        expect(bookDestroySpy).toHaveBeenCalled();
    })

    // Reason: The method createAuthorModel and addAuthorModel are added at runtime, so jest doesn't sees them
    // test("addAuthors", async ()=>{
    //     const result = BookService.addAuthor(MOCK_BOOK, MOCK_AUTHOR)
    //     await expect(MOCK_BOOK.authors).toBe([MOCK_AUTHOR])
    // })
    //
    // test("removeAuthors", async ()=>{
    //     const result = BookService.removeAuthor(MOCK_BOOK, MOCK_AUTHOR)
    //     await expect(MOCK_BOOK.authors).toBe([])
    // })
});
