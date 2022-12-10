export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    genres?: GenrePreference[];
    sentiments?: SentimentPreference[];
}

export interface Book {
    id?: number;
    title: string;
    genre: string;
    authors: string;
    audioBook: string;
    cover: string;
    description: string;
    imdbLink: string;
    youtubeLink: string;
}

export interface GenrePreference {
    id?: number;
    name: string;
    userId?: number;
}

export interface SentimentPreference {
    id?: number;
    name: string;
    userId?: number;
}

