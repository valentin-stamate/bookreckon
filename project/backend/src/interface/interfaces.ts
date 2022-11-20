export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    preferences: string[];
}

export interface Book {
    id?: number;
    title: string;
    genre: string;
    authors: string;
    audioBook: string;
    photo: string;
    description: string;
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
    title: string;
}

