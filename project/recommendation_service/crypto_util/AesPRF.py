from crypto_util.PRF import PRF
from crypto_util.AESCipher import AESCipher
from hashlib import md5


class AesPRF(PRF):
    def generate(self, val: bytes, key: bytes) -> bytes:
        aes = AESCipher().new(key)

        return aes.encrypt(val)
