import {BookService} from "./book.service";
import {BOOKS} from "../dataset/books";
import {USERS} from "../dataset/users";
import {UserService} from "./user.service";

import prisma from '../context/context'


export async function populateDatabase() {
    

    await prisma.genrePreference.deleteMany();
    await prisma.sentimentPreference.deleteMany();
    await prisma.user.deleteMany();
    await prisma.book.deleteMany();

    const books = BOOKS;
    const users = USERS;

    for (let book of books) {
        await BookService.addBook(book);
    }

    for (let user of users) {
        await UserService.createUser(user);
    }

}