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
    goodreadsLink: string;
    youtubeLink: string;
    rating: number;
    ratings: number;
    reviews: number;
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

