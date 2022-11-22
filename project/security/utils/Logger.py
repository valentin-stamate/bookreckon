from typing import Callable
from datetime import datetime
import os

# Local imports
import constants


class Logger:
    def __init__(self):
        self.__prepare_logging_environment_hook()

        self.__log_date_format = '%Y-%m-%d-%H-%M-%S'
        self.__log_stream_handle = open(
            f'{constants.LOGGING_FOLDER}/'
            f'{datetime.now().strftime(self.__log_date_format)}.log',
            'w'
        )

    @staticmethod
    def __prepare_logging_environment_hook():
        if not os.path.exists(constants.LOGGING_FOLDER):
            try:
                os.mkdir(constants.LOGGING_FOLDER, 0O740)
            except OSError as e:
                print(f'ERROR\tUnable to create logging directory. Cause: {e}')

    def log_before(self, func: Callable):
        self.__log_stream_handle.write(f'Method {func} is executing...')

    def log_after(self, func: Callable):
        self.__log_stream_handle.write(f'Method {func} executed...')

    def log_exception(self, func: Callable, e: Exception):
        self.__log_stream_handle.write(f'Method {func} exception thrown: {e}')
