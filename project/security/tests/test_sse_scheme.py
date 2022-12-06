import sys
import unittest

# Local imports
sys.path.append('../utils')
from SearchableEncryption import SearchableEncryptionScheme
from AESCipher import AESCipher
from AesPRF import AesPRF
from RandomKeyGenerator import RandomKeyGenerator
from SearchableEncryptionProtocol import SearchableEncryptionProtocol


class SSESchemeTest(unittest.TestCase):
    BITS = 128

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._rkg = RandomKeyGenerator()
        self._aes = AESCipher()
        self._aes_prf = AesPRF()
        self._key = self._aes.new(self._rkg.generate_symmetric_key(self.BITS))

    def test_successful_category_query(self):
        # Each book has one or more categories
        categories = {b'horror', b'drama', b'action'}

        # Initialize the Searchable Encryption Scheme
        se = SearchableEncryptionScheme(self._aes,
                                        self._rkg,
                                        SSESchemeTest.BITS,
                                        self._aes_prf)
        sep = SearchableEncryptionProtocol(se)
        sep.setup(categories)

        # Check if the book has a desired category
        to_query = b'drama'

        # If true, we found the book that belongs in the desired category,
        # which can be decrypted and then be sent to the user
        self.assertTrue(
            sep.check_category(to_query),
            'Could not find any book that matches that category'
        )

    def test_unsuccessful_category_query(self):
        # Each book has one or more categories
        categories = {b'horror', b'drama', b'action'}

        # Initialize the Searchable Encryption Scheme
        se = SearchableEncryptionScheme(self._aes,
                                        self._rkg,
                                        SSESchemeTest.BITS,
                                        self._aes_prf)
        sep = SearchableEncryptionProtocol(se)
        sep.setup(categories)

        # Check if the book has a desired category
        to_query = b'comedy'

        # This should fail as *comedy* is not part of the `categories` set
        # above.
        self.assertFalse(
            sep.check_category(to_query),
            'The scheme erroneously reported a matching category, even though '
            'it does not exist'
        )


if __name__ == "__main__":
    unittest.main()
