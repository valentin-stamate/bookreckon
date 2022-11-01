import {Book} from "../interface/interfaces";

export class BookEncryption{
    static encryptBook(book: Book): string {
        return "";
    }

    static decryptBook(ciphertext: string): Promise<void>{
        return Promise.reject();
    }

    static getEncryptionKey(): number {
        return 0;
    }

    static getDecryptionKey(): number {
        return 0;
    }

}