from SearchableEncryption import SearchableEncryptionScheme
from AESCipher import AESCipher
from AesPRF import AesPRF
from RandomKeyGenerator import RandomKeyGenerator
from SearchableEncryptionProtocol import SearchableEncryptionProtocol
from Logger import Logger


def main():
    # Logger.log_after('ceva')

    # fiecare carte are una sau mai multe categorii
    categories = {b'horror', b'drama', b'action'}

    # initializam schema de cautare
    aes = AESCipher()
    aes_prf = AesPRF()
    rkg = RandomKeyGenerator()
    sec_param = 128

    se = SearchableEncryptionScheme(aes, rkg, sec_param, aes_prf)
    sep = SearchableEncryptionProtocol(se)

    sep.setup(categories)

    # incercam sa verificam daca cartea noastra are o anumita categorie
    to_query = b'drama'
    # to_query = b'comedy'

    # daca e True atunci am gasit cartea cu categoria cautata pe care o putem decripta si trimite user-ului
    print(sep.check_category(to_query))



if __name__ == "__main__":
    main()
