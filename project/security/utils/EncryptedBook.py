from typing import List


class EncryptedBook:
    def __init__(self, enc_categories: List[bytes], content: bytes):
        self.enc_categories = enc_categories
        self.content = content

    def get_enc_categories(self):
        return self.enc_categories

    def get_content(self):
        return self.content
