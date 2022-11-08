from typing import List, Set
from Cipher import Cipher
from KeyGenerator import KeyGenerator


class SearchableEncryptionScheme:
    def __init__(self, cipher: Cipher, key_gen: KeyGenerator, sec_param: int):
        self.cipher = cipher
        self.key_gen = key_gen
        self.sec_param = sec_param

    def data_key_gen(self) -> bytes:
        return self.key_gen.generate_symmetric_key(self.sec_param)

    def query_key_gen(self) -> bytes:
        return self.key_gen.generate_symmetric_key(self.sec_param)

    def process_set(self, enc_key: bytes, s: set) -> List[bytes]:
        return [self.cipher.encrypt(pt) for pt in s]

    def share(self, t: set) -> (bytes, bytes):
        pass

    def query(self, keywords: Set[bytes]) -> bytes:
        pass

    def search(self, delta: (bytes, bytes), q: int, t: Set[bytes]) -> bool:
        pass
