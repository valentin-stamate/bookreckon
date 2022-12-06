#!/usr/bin/env python3

import sys
from flask import Flask
from flask_restx import Api, Resource

# Local imports
sys.path.append('../utils')
import constants
from AesPRF import AesPRF
from RandomKeyGenerator import RandomKeyGenerator
from AESCipher import AESCipher
from SearchableEncryption import SearchableEncryptionScheme
from SearchableEncryptionProtocol import SearchableEncryptionProtocol

app = Flask(constants.APP_NAME)
api = Api(
    app,
    version=constants.APP_VERSION,
    title=f"{constants.APP_NAME} API",
    description='REST API for the Secure Core of BookRecon'
)
ns = api.namespace('crypto', description='Cryptographic operations')

# Parsers
query_parser = ns.parser()
query_parser.add_argument('category', location='json', required=True)


@ns.route('/query')
@ns.doc(params={})
@ns.expect(query_parser)
class Query(Resource):
    @staticmethod
    def post():
        args = query_parser.parse_args()
        category = args['category']

        # Each book has one or more categories
        categories = {b'horror', b'drama', b'action', b'musical'}

        rkg = RandomKeyGenerator()
        aes = AESCipher()
        aes_prf = AesPRF()
        key = aes.new(rkg.generate_symmetric_key(128))

        # Initialize the Searchable Encryption Scheme
        se = SearchableEncryptionScheme(aes,
                                        rkg,
                                        128,
                                        aes_prf)
        sep = SearchableEncryptionProtocol(se)
        sep.setup(categories)

        # Check if the book has a desired category
        result = sep.check_category(category.encode('utf-8'))

        return {
            'response': f'Is there a book in the *{category}* category? '
                        f'{result}'
        }


if __name__ == "__main__":
    app.run(host=constants.HOST, debug=True)
