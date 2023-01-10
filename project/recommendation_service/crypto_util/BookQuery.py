from crypto_util.SearchableEncryption import SearchableEncryptionScheme
from crypto_util.EncryptedBook import EncryptedBook


class BookQuery:
    def __init__(self, se: SearchableEncryptionScheme, key_prf: bytes, book: EncryptedBook, enc_keyword: bytes):
        self.se = se
        self.key_prf = key_prf
        self.book = book
        self.enc_key = se.data_key_gen()
        self.enc_keyword = enc_keyword

    def query(self) -> bool:
        print(self.book.get_enc_categories())
        delta = self.se.share(self.enc_key, self.key_prf, self.book.get_enc_categories())

        return self.se.search(delta, self.enc_keyword)


