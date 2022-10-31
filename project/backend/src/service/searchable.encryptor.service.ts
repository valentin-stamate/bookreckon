export class SearchableEncryptorService {
    static _searchCacheByKeywords(encryptedKeywords: Array<string>): Promise<void> {
        return Promise.reject();
    }

    static searchByKeywords(encryptedKeywords: Array<string>): Promise<void> {
        let cacheResults = this._searchCacheByKeywords(encryptedKeywords);
        return Promise.reject();
    }
}