from RandomKeyGenerator import RandomKeyGenerator
from AESCipher import AESCipher
from PKS7 import PKS7
from Logger import Logger

G_LOGGER = Logger()


@G_LOGGER.log_exception
@G_LOGGER.log_after
@G_LOGGER.log_before
def test():
    print('Hello')
    raise ValueError('test')


def main():
    test()


if __name__ == "__main__":
    main()
