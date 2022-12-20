from typing import List

from SearchableEncryptionProtocol import SearchableEncryptionProtocol


class BookFinder:
    def __init__(self, sep: SearchableEncryptionProtocol):
        self.sep = sep

    def query(self, keyword: bytes, books: (bytes, List[bytes])) -> List[bytes]:
        ret = []
        for book in books:
            self.sep.setup(book[1])

            if self.sep.check_category(keyword):
                ret.append(book[0])

        return ret
