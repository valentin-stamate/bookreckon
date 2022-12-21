
export class Endpoints {
  static HOST: string = "http://localhost:8090";

  static LOGIN = `${Endpoints.HOST}/api/user/login`;
  static SIGNUP = `${Endpoints.HOST}/api/user/signup`;
  static EDIT_PREFERENCE = `${Endpoints.HOST}/api/user/edit-preference`;
  static RECOMMENDATION = `${Endpoints.HOST}/api/user/recommendations`;
  static BOOK_RECOMMENDATION = `${Endpoints.HOST}/api/user/book-recommendations`;
  static USER_INFO = `${Endpoints.HOST}/api/user/info`;
  static BOOK_INFO = `${Endpoints.HOST}/api/book`;
}
