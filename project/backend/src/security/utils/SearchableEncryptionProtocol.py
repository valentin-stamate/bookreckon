from typing import Set

from SearchableEncryption import SearchableEncryptionScheme


class SearchableEncryptionProtocol:
    def __init__(self, scheme: SearchableEncryptionScheme):
        self.scheme = scheme

    def setup(self):
        pass

    def search_book(self, keywords: Set[bytes]):
        pass
