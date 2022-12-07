from PRF import PRF
from AESCipher import AESCipher
from hashlib import md5


class AesPRF(PRF):
    def generate(self, val: bytes, key: bytes) -> bytes:
        aes = AESCipher().new(key)

        return aes.encrypt(val)
