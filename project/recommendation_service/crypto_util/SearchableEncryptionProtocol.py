from typing import Set

from crypto_util.SearchableEncryption import SearchableEncryptionScheme


class SearchableEncryptionProtocol:
    def __init__(self, scheme: SearchableEncryptionScheme, key_prf: bytes):
        self.scheme = scheme
        self.key_prf = key_prf
        self.delta = (b'', {})

    # realizam setup-ul schemei de cautare pornind de la categoriile cartii
    def setup(self, s: set):
        enc_key = self.scheme.data_key_gen()
        query_key = self.scheme.query_key_gen()

        self.key_prf = query_key

        t = self.scheme.process_set(enc_key, s)
        delta = self.scheme.share(enc_key, query_key, t)

        self.delta = delta

    def check_category(self, keyword: bytes) -> bool:
        q = self.scheme.query(self.key_prf, keyword)

        return self.scheme.search(self.delta, q)
