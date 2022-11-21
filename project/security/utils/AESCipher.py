from Cipher import Cipher
from Crypto.Cipher import AES
from PKS7 import PKS7


class AESCipher(Cipher):
    def __init__(self):
        self.cipher = None
        self.key = b''

    def encrypt(self, message: bytes) -> bytes:
        assert self.cipher

        return self.cipher.encrypt(PKS7.add_padding(message, len(self.key)))

    def decrypt(self, ciphertext: bytes) -> bytes:
        assert self.cipher and len(ciphertext) % len(self.key) == 0

        return PKS7.remove_padding(self.cipher.decrypt(ciphertext))

    def new(self, key: bytes):
        self.key = key
        self.cipher = AES.new(self.key, AES.MODE_ECB)

        return self
