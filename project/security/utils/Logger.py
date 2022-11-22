from logger_constants import log_file


class Logger:
    @staticmethod
    def log_before(func):
        log_file.write(f'Method {func} is executing...')

    @staticmethod
    def log_after(func):
        log_file.write(f'Method {func} executed...')

    @staticmethod
    def log_exception(method, e):
        log_file.write(f'Method {method} exception thrown: {e}')
