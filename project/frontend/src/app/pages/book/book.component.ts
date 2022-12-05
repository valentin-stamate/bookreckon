import { Component } from '@angular/core';
import {Book} from "../../service/interfaces";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  book: Book = {} as any;
  youtubeUrl: SafeUrl = '';

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.onFetchBook();
  }

  /* https://stackoverflow.com/a/60803005/10805602 */
  async onFetchBook() {
    this.book =   {
      id: 1,
      title: 'Title',
      genre: 'Drama',
      authors: 'Ana are mere',
      audioBook: "https://www.youtube.com/watch?v=Li8OK7JZtUs",
      photo: 'https://i.postimg.cc/prdFGHBn/image.png',
      description: 'dsa',
      imdb: 'dasda',
      youtube: 'https://www.youtube.com/watch?v=Li8OK7JZtUs',
    };

    const matches = this.book.youtube.split(/v=/g);

    if (matches != null) {
      const url = `https://www.youtube.com/embed/${matches[1]}`
      this.youtubeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    console.log(this.youtubeUrl)

  }

}
