from abc import ABC, abstractmethod


class PRF(ABC):
    @abstractmethod
    def generate(self, val: bytes, key: bytes) -> bytes:
        pass
