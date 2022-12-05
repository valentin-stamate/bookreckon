from Logger import Logger

APP_NAME = "Secure_Core"
APP_VERSION = "0.1.0"
HOST = "0.0.0.0"

# ### Logging ### #
LOGGER = Logger()
# New bindings - aliases
before_method = LOGGER.log_before
after_method = LOGGER.log_after
on_exception = LOGGER.log_exception

