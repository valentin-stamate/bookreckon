import sys
sys.path.append('../utils')

from RandomKeyGenerator import RandomKeyGenerator
from AESCipher import AESCipher
import unittest


class RandomKeyGeneratorTest(unittest.TestCase):
    BITS = 128
    MESSAGE_TO_BE_ENCRYPTED = b'very secret message'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._rkg = RandomKeyGenerator()
        self._aes = AESCipher()
        self._key = self._aes.new(self._rkg.generate_symmetric_key(self.BITS))

    def test_key_generation(self):
        self.assertIsNotNone(self._key, 'The key could not be generated')

    def test_aes_encryption(self):
        encrypted = self._aes.encrypt(self.MESSAGE_TO_BE_ENCRYPTED)

        self.assertIsInstance(
            encrypted,
            bytes,
            'The message could not be encrypted'
        )

    def test_aes_decryption(self):
        encrypted = self._aes.encrypt(self.MESSAGE_TO_BE_ENCRYPTED)

        if isinstance(encrypted, bytes):
            result = self._aes.decrypt(encrypted)

            self.assertEqual(result, self.MESSAGE_TO_BE_ENCRYPTED)


if __name__ == "__main__":
    unittest.main()
