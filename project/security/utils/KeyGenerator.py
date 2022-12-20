from abc import ABC, abstractmethod


class KeyGenerator(ABC):
    @staticmethod
    @abstractmethod
    def generate_symmetric_key(sec_param: int) -> bytes:
        pass

    @staticmethod
    @abstractmethod
    def generate_public_key(sec_param: int):
        pass
