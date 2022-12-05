#!/usr/bin/env python3

from flask import Flask
from flask_restx import Api, Resource

from Advanced_Software_Engineering_Techniques.BookReckon.project.security.utils import \
    constants

app = Flask(constants.APP_NAME)
api = Api(
    app,
    version=constants.APP_VERSION,
    title=f"{constants.APP_NAME} API",
    description='REST API for the secure core of Book Recon'
)
ns = api.namespace('encrypt', description='Cryptographic operations')


@ns.route('/test')
@ns.doc(params={})
class TestApp(Resource):
    @staticmethod
    def get():
        return '<h1>Hello, World!</h1>'


if __name__ == "__main__":
    app.run(host=constants.HOST, debug=True)
