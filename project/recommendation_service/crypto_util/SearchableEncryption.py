from typing import List, Set
from crypto_util.Cipher import Cipher
from crypto_util.KeyGenerator import KeyGenerator
from crypto_util.PRF import PRF
from hashlib import md5


class SearchableEncryptionScheme:
    def __init__(self, cipher: Cipher, key_gen: KeyGenerator, sec_param: int, prf: PRF):
        self.cipher = cipher
        self.key_gen = key_gen
        self.sec_param = sec_param
        self.prf = prf

    def data_key_gen(self) -> bytes:
        key = self.key_gen.generate_symmetric_key(self.sec_param)
        self.cipher = self.cipher.new(key)
        return key

    def query_key_gen(self) -> bytes:
        return self.key_gen.generate_symmetric_key(self.sec_param)

    def process_set(self, enc_key: bytes, s: set) -> Set[bytes]:
        return {self.cipher.encrypt(pt) for pt in s}

    def share(self, enc_key: bytes, prf_key: bytes, t: set):
        self.cipher = self.cipher.new(enc_key)
        r = self.key_gen.generate_symmetric_key(self.sec_param)
        s = [self.cipher.decrypt(c) for c in t]

        d = set()

        for w in s:
            k = self.prf.generate(w, prf_key)
            d0 = self.prf.generate(r, k)
            d.add(md5(d0).hexdigest())

        return r, d

    def query(self, key_prf: bytes, keyword: bytes) -> bytes:
        return self.prf.generate(keyword, key_prf)

    def search(self, delta, q: bytes) -> bool:
        r, d = delta
        d0 = md5(self.prf.generate(r, q)).hexdigest()

        return d0 in d
