from crypto_util.KeyGenerator import KeyGenerator
from Crypto.Random import random
from crypto_util.constants import on_exception, after_method, before_method


class RandomKeyGenerator(KeyGenerator):
    @staticmethod
    @on_exception
    @after_method
    @before_method
    def generate_public_key(sec_param: int):
        return random.getrandbits(sec_param), random.getrandbits(sec_param)

    @staticmethod
    @on_exception
    @after_method
    @before_method
    def generate_symmetric_key(sec_param: int) -> bytes:
        return random.getrandbits(sec_param).to_bytes(sec_param // 8, 'big')
