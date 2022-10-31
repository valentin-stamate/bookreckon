export interface User {
    username: string;
    email: string;
    password: string;
    preferences: string[];
}


export interface Book {
    name: string;
    genre: string;
    authors: Author[];
    audio: Buffer;
    photo: Buffer;
    details: string;
    imdbLink: string;
    youtubeLink: string;
}

export interface Author {
    firstName: string;
    lastName: string;
    birthDate: Date;
}