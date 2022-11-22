from KeyGenerator import KeyGenerator
from Crypto.Random import random
from Logger import Logger


class RandomKeyGenerator(KeyGenerator):
    @staticmethod
    def generate_public_key(sec_param: int) -> (bytes, bytes):
        return random.getrandbits(sec_param), random.getrandbits(sec_param)

    @staticmethod
    def generate_symmetric_key(sec_param: int) -> bytes:
        return random.getrandbits(sec_param).to_bytes(sec_param // 8, 'big')
