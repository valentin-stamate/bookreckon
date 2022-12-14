import {Book, GenrePreference, User} from "../../interface/interfaces";
import {NextFunction, Request} from "express";



export const MOCK_BOOK: Book = {
    id: 0,
    title: "1984",
    genre: "SF",
    authors: "George Orwell",
    audioBook: "youtube.com",
    cover: 'photo_url',
    description: "Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching...",
    imdbLink: "https://www.imdb.com/title/tt0087803/",
    goodreadsLink: 'https://www.goodreads.com/book/show/40961427-1984',
    youtubeLink: "https://www.youtube.com/watch?v=T8BA7adK6XA&ab_channel=HDRetroTrailers",
    rating: 5.0,
    ratings: 10,
    reviews: 10
}

export const MOCK_GENRE: GenrePreference = {
    id: 0,
    name: 'SF'
}

export const MOCK_SENTIMENT: GenrePreference = {
    id: 0,
    name: 'a_sentiment'
}

export const MOCK_USER: User = {
    id: 0,
    username: "Cezar",
    email: "cezarcez@outlook.com",
    password: "parola",
    genres: [MOCK_GENRE],
    sentiments: [MOCK_SENTIMENT]
}

export const MOCK_USER_NO_USERNAME: User = {
    id: 0,
    username: '',
    email: "cezarcez@outlook.com",
    password: "parola",
    genres: [MOCK_GENRE],
    sentiments: [MOCK_SENTIMENT]
}

export const MOCK_REQUEST: any = {
    headers:{
        Authorization: "anAuthToken"
    },
    body: {
        id: 0,
        username: "Cezar",
        email: "cezarcez@outlook.com",
        password: "parola",
        genres: [MOCK_GENRE],
        sentiments: [MOCK_SENTIMENT]
    },
};

export const MOCK_REQUEST_ID_NULL: any = {
    headers:{
        Authorization: "anAuthToken"
    },
    body: {
        id: undefined,
        username: "Cezar",
        email: "cezarcez@outlook.com",
        password: "parola",
        genres: [MOCK_GENRE],
        sentiments: [MOCK_SENTIMENT]
    },
};

export const MOCK_REQUEST_PREFERENCES_NULL: any = {
    body: {
        id: 1,
        username: "Cezar",
        email: "cezarcez@outlook.com",
        password: "parola",
        genres: [MOCK_GENRE],
        sentiments: [MOCK_SENTIMENT]
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
