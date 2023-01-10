from abc import ABC, abstractmethod


class Cipher(ABC):

    @abstractmethod
    def encrypt(self, message: bytes) -> bytes:
        pass

    @abstractmethod
    def decrypt(self, ciphertext: bytes) -> bytes:
        pass

    @abstractmethod
    def new(self, key: bytes):
        pass
