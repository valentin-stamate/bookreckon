export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    preferences: string[];
}

export interface Book {
    id?: number;
    name: string;
    genre: string;
    authors: Author[];
    audio: Buffer;
    photo: string;
    details: string;
    imdb: string;
    youtube: string;
}

export interface Author {
    id?: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
}

export interface Preference {
    id?: number;
    name: string;
}