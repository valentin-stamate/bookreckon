from SearchableEncryption import SearchableEncryptionScheme
from AESCipher import AESCipher
from AesPRF import AesPRF
from RandomKeyGenerator import RandomKeyGenerator
from SearchableEncryptionProtocol import SearchableEncryptionProtocol
from BookQuery import BookQuery
from EncryptedBook import EncryptedBook
from AWSSecretKey import AWSSecretKey
from Book import Book


def request_books():
    books = [
        Book([b'drama', b'action'], b'Alba ca zapada', b'Cn o scris-o', 4),
        Book([b'action', b'comedy'], b'Mos Craciun', b'Cineva', 7),
        Book([b'thriller', b'action'], b'Un al titlu', b'Eu', 3),
        Book([b'fantasy', b'drama'], b'Inca un titlu', b'Tu', 10)
    ]

    enc_key = AWSSecretKey.generate_symmetric_key()

    enc_books = [EncryptedBook(book.encrypt_genres(enc_key), book.encrypt_rest(enc_key)) for book in books]

    return enc_books


def get_query():
    key_prf = b'qwertyuiopasdfgh'

    aes_prf = AesPRF()
    to_query = aes_prf.generate(b'action', key_prf)

    return to_query, key_prf


def main():
    sec_param = 128

    se = SearchableEncryptionScheme(AESCipher(), AWSSecretKey(), sec_param, AesPRF())

    enc_books = request_books()
    to_query, key_prf = get_query()

    for enc_book in enc_books:
        query = BookQuery(se, key_prf, enc_book, to_query)

        if query.query():
            print(se.cipher.decrypt(enc_book.get_content()))


if __name__ == "__main__":
    main()
