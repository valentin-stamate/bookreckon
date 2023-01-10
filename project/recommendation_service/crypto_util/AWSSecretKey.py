from crypto_util.KeyGenerator import KeyGenerator


class AWSSecretKey(KeyGenerator):
    @staticmethod
    def generate_symmetric_key(sec_param: int = 128) -> bytes:
        return b'aaaaaaaaaaaaaaaa'

    @staticmethod
    def generate_public_key(sec_param: int) -> (bytes, bytes):
        pass
