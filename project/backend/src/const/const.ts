import {User, Book, Author} from "../interface/interfaces";

export const enum ResponseMessage {

}

export const MOCK_AUTHOR: Author = {
    firstName: "George",
    lastName: "Orwell",
    birthDate: new Date("1903-06-25")
}

export const MOCK_BOOK: Book = {
    name: "1984",
    genre: "SF",
    authors: [],
    audio: new Buffer("mock_audio"),
    photo: new Buffer("mock_photo"),
    details: "Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching...",
    imdbLink: "https://www.imdb.com/title/tt0087803/",
    youtubeLink: "https://www.youtube.com/watch?v=T8BA7adK6XA&ab_channel=HDRetroTrailers"
}

export const MOCK_USER: User = {
    username: "Cezar",
    email: "cezarcez@outlook.com",
    password: "parola",
    preferences: ["action", "automotive"]
}

export const enum ContentType {
    TEXT = 'text/plain',
    JSON = 'application/json',
    ZIP = 'application/zip',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const enum Headers {
    AUTHORIZATION = 'Authorization',
}

/** Contains the request responses */
export const enum StatusCode {
    /** Informational */
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,

    /** SUCCESS = 2×× */
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,

    /** REDIRECTION = 3×× */
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,

    /** CLIENT ERROR = 4×× */
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    CONNECTION_CLOSED_WITHOUT_RESPONSE = 444,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    CLIENT_CLOSED_REQUEST = 499,

    /**  SERVER ERROR = 5×× */
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511,
    NETWORK_CONNECT_TIMEOUT_ERROR = 599,
}