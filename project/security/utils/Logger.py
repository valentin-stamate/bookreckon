from datetime import datetime
from typing import Callable
import functools
import os

# Local imports
import constants


class Logger:
    def __init__(self) -> None:
        self.__prepare_logging_environment_hook()

        self.__inner_log_date_format = '%Y-%m-%d %H:%M:%S'
        self.__log_name_date_format = '%Y-%m-%d-%H-%M-%S'
        self.__log_stream_handle = open(
            f'{constants.LOGGING_FOLDER}/'
            f'{datetime.now().strftime(self.__log_name_date_format)}.log',
            'w'
        )

    @staticmethod
    def __prepare_logging_environment_hook() -> None:
        if not os.path.exists(constants.LOGGING_FOLDER):
            try:
                os.mkdir(constants.LOGGING_FOLDER, 0O740)
            except OSError as e:
                print(f'ERROR\tUnable to create logging directory. Cause: {e}')

    def log_before(self, func: Callable[..., None]) -> ():
        self.__log_stream_handle.write(
            f'{datetime.now().strftime(self.__inner_log_date_format)}\tMethod '
            f'{func.__name__}() is executing...\n'
        )

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            func()

        return wrapper

    def log_after(self, func: Callable[..., None]) -> ():
        self.__log_stream_handle.write(
            f'{datetime.now().strftime(self.__inner_log_date_format)}\tMethod '
            f'{func.__name__}() executed...\n'
        )

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            func()

        return wrapper

    def log_exception(self, func: Callable[..., None]) -> ():
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                func()
            except Exception as e:
                self.__log_stream_handle.write(
                    f'{datetime.now().strftime(self.__inner_log_date_format)}'
                    f'\tMethod {func.__name__}() exception thrown: '
                    f'{type(e).__name__}{e.args}\n'
                )
            finally:
                pass

        return wrapper
