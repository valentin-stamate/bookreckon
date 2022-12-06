from datetime import datetime
from typing import Callable, Any
import functools
import os


class Logger:
    LOGGING_FOLDER = './logs'

    def __init__(self) -> None:
        self.__prepare_logging_environment_hook()

        self.__inner_log_date_format = '%Y-%m-%d %H:%M:%S'
        self.__log_name_date_format = '%Y-%m-%d-%H-%M-%S'
        self.__log_stream_handle = open(
            f'{Logger.LOGGING_FOLDER}/'
            f'{datetime.now().strftime(self.__log_name_date_format)}.log',
            'w'
        )

    @staticmethod
    def __prepare_logging_environment_hook() -> None:
        if not os.path.exists(Logger.LOGGING_FOLDER):
            try:
                os.mkdir(Logger.LOGGING_FOLDER, 0O740)
            except OSError as e:
                print(f'ERROR\tUnable to create logging directory. Cause: {e}')

    def log_before(self, func: Callable[..., None]) -> ():
        self.__log_stream_handle.write(
            f'{datetime.now().strftime(self.__inner_log_date_format)}\tMethod '
            f'{func.__name__}() is executing...\n'
        )

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)

        return wrapper

    def log_after(self, func: Callable[..., None]) -> ():
        self.__log_stream_handle.write(
            f'{datetime.now().strftime(self.__inner_log_date_format)}\tMethod '
            f'{func.__name__}() executed...\n'
        )

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)

        return wrapper

    def log_exception(self, func: Callable[..., None]) -> Any:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                self.__log_stream_handle.write(
                    f'{datetime.now().strftime(self.__inner_log_date_format)}'
                    f'\tMethod {func.__name__}() exception thrown: '
                    f'{type(e).__name__}{e.args}\n'
                )
            finally:
                pass

        return wrapper
