class PKS7:
    @staticmethod
    def add_padding(text: bytes, length: int) -> bytes:
        padding = length - len(text) % length
        if padding == 0:
            to_pad = length.to_bytes(1, 'big') * length
        else:
            to_pad = padding.to_bytes(1, 'big') * padding

        return text + to_pad

    @staticmethod
    def remove_padding(text: bytes) -> bytes:
        padding = int(text[-1])

        return text[:-padding]
