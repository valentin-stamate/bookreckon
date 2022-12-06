#!/usr/bin/env python3

import sys
from flask import Flask
from flask_restx import Api, Resource

# Local imports
sys.path.append('../utils')
import constants

app = Flask(constants.APP_NAME)
api = Api(
    app,
    version=constants.APP_VERSION,
    title=f"{constants.APP_NAME} API",
    description='REST API for the Secure Core of BookRecon'
)
ns = api.namespace('encrypt', description='Cryptographic operations')


@ns.route('/test')
@ns.doc(params={})
class BookRecon(Resource):
    @staticmethod
    def get():
        return '<h1>Hello, World!</h1>'


if __name__ == "__main__":
    app.run(host=constants.HOST, debug=True)
