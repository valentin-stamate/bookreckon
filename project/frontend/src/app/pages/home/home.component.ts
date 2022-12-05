import { Component } from '@angular/core';
import {Book} from "../../service/interfaces";

const mockBooks: Book[] = [
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
  {
    id: 1,
    title: 'Title',
    genre: 'Drama',
    authors: 'Ana are mere',
    audioBook: "https://youtu.be/Li8OK7JZtUs",
    photo: 'https://i.postimg.cc/prdFGHBn/image.png',
    description: 'dsa',
    imdb: 'dasda',
    youtube: 'https://youtu.be/eQ1NMcCmj8Q',
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  books: Book[] = mockBooks;

}
