from constants import on_exception, after_method, before_method


# THE ORDER MATTERS!
@on_exception
@after_method
@before_method
def test():
    print('Hello')
    raise ValueError('test')


def main():
    test()


if __name__ == "__main__":
    main()
