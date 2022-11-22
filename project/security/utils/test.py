from RandomKeyGenerator import RandomKeyGenerator
from AESCipher import AESCipher
from PKS7 import PKS7
from Logger import Logger

G_LOGGER = Logger()

# New bindings - aliases
before_method = G_LOGGER.log_before
after_method = G_LOGGER.log_after
on_exception = G_LOGGER.log_exception


# THE ORDER MATTERS!
@on_exception
@after_method
@before_method
def test():
    print('Hello')
    raise ValueError('test')


def main():
    test()


if __name__ == "__main__":
    main()
