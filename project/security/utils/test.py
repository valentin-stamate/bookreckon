from RandomKeyGenerator import RandomKeyGenerator
from AESCipher import AESCipher
from PKS7 import PKS7


def main():
    rkg = RandomKeyGenerator()

    aes = AESCipher().new(rkg.generate_symmetric_key(128))
    c = aes.encrypt(b'1234567')

    print(c)

    print(aes.decrypt(c))


if __name__ == "__main__":
    main()
