from typing import List
from crypto_util.AESCipher import AESCipher
import json


class Book:
    def __init__(self, genres: List[bytes], title: bytes, author: bytes, rating: int):
        self.genres = genres
        self.title = title
        self.author = author
        self.rating = rating

    def encrypt_genres(self, key: bytes) -> List[bytes]:
        aes = AESCipher()
        aes.new(key)

        return [aes.encrypt(g) for g in self.genres]

    def encrypt_rest(self, key: bytes):
        aes = AESCipher()
        aes.new(key)

        m = {
            'title': self.title.decode(),
            'author': self.author.decode(),
            'rating': self.rating
        }

        pt = json.dumps(m)

        return aes.encrypt(pt.encode())
