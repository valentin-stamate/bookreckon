import {BookEncryption} from "../service/book.encryption.service";
import {MOCK_BOOK} from "./mocked/mock";

describe('Book encryption service tests', function () {

    test('Encrypt book', () => {
        const result = BookEncryption.encryptBook(MOCK_BOOK);
        expect(result).toEqual("");
    });

    test('Decrypt book', async () =>{
        const result = BookEncryption.decryptBook("");
        await expect(result).resolves.not.toThrow();
    });

    test('Get encryption key', async () =>{
        const result = BookEncryption.getEncryptionKey();
        expect(result).toEqual(0);
    });

    test("Get decryption key", ()=>{
        const result = BookEncryption.getDecryptionKey();
        expect(result).toEqual(0);
    });
});