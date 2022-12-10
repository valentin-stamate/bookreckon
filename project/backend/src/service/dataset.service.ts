import {BookService} from "../service/book.service";
import {BOOKS} from "../dataset/books";
import {USERS} from "../dataset/users";
import {UserService} from "./user.service";
import {PrismaClient} from "@prisma/client";


export async function populateDatabase() {
    const prismaClient = new PrismaClient();

    await prismaClient.genrePreference.deleteMany();
    await prismaClient.sentimentPreference.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.book.deleteMany();

    const books = BOOKS;
    const users = USERS;

    for (let book of books) {
        await BookService.addBook(book);
    }

    for (let user of users) {
        await UserService.createUser(user);
    }

}