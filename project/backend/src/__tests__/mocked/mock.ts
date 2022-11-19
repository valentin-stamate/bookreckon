import {Author, Book, Preference, User} from "../../interface/interfaces";
import {NextFunction, Request} from "express";

export const MOCK_AUTHOR: Author = {
    firstName: "George",
    lastName: "Orwell",
    birthDate: new Date("1903-06-25")
}

export const MOCK_BOOK: Book = {
    title: "1984",
    genre: "SF",
    authors: "Vali Stamate",
    audioBook: "youtube.com",
    photo: 'photo_url',
    description: "Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching...",
    imdb: "https://www.imdb.com/title/tt0087803/",
    youtube: "https://www.youtube.com/watch?v=T8BA7adK6XA&ab_channel=HDRetroTrailers"
}

export const MOCK_USER: User = {
    id: 1,
    username: "Cezar",
    email: "cezarcez@outlook.com",
    password: "parola",
    preferences: ["action", "automotive"]
}

export const MOCK_PREFERENCE: Preference = {
    title: 'romance',
}

export const MOCK_REQUEST_ID_NULL: any = {
    body: {
        id: undefined,
        username: "Cezar",
        email: "cezarcez@outlook.com",
        password: "parola",
        preferences: ["action", "automotive"]
    },
};

export const MOCK_REQUEST_PREFERENCES_NULL: any = {
    body: {
        id: 1,
        username: "Cezar",
        email: "cezarcez@outlook.com",
        password: "parola",
        preferences: undefined,
    },
};

export const MOCK_REQUEST_USERNAME_NULL: any = {
    body: {
        id: 1,
        username: undefined,
        email: "cezarcez@outlook.com",
        password: "parola",
        preferences: ["action"],
    },
};

export const MOCK_REQUEST_PASSWORD_NULL: any = {
    body: {
        id: 1,
        username: "Cezar",
        email: "cezarcez@outlook.com",
        password: undefined,
        preferences: ["action"],
    },
};


export const MOCK_REQUEST_USER = {
    body: {
        id: 1,
        username: "Cezar",
        email: "cezarcez@outlook.com",
        password: "parola",
        preferences: ["action", "automotive"]
    },
} as Request;

export const MOCK_RESPONSE: any = {
    json: jest.fn(),
    status: jest.fn(),
    end: jest.fn(),
};

export const MOCK_REQUEST_PREFERENCES = {
    body: {
        id: 1,
        preferenceID: 10,
        preferenceName: "adventure",
    },
} as Request;

export const MOCK_REQUEST_ID_NULL_PREFERENCES = {
    body: {
        id: undefined,
        preferenceID: 10,
        preferenceName: "adventure",
    },
} as Request;

export const MOCK_REQUEST_PREFERENCE_ID_NULL_PREFERENCES = {
    body: {
        id: 1,
        preferenceID: undefined,
        preferenceName: "adventure",
    },
} as Request;

export const MOCK_REQUEST_PREFERENCE_NAME_NULL_PREFERENCES = {
    body: {
        id: 1,
        preferenceID: 10,
        preferenceName: undefined,
    },
} as Request;

export const MOCK_NEXT: any = jest.fn();
