import { Component } from '@angular/core';
import {Book} from "../../service/interfaces";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import axios from "axios";
import {Endpoints} from "../../service/endpoints";
import {Cookies, CookieService} from "../../service/cookie.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {

  book: Book = {} as any;
  reccomendations: Book[] = [];
  youtubeUrl: SafeUrl = '';
  youtubeAudioUrl: SafeUrl = '';

  constructor(private _sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      const id = params['id'];

      const result = await axios.get(`${Endpoints.BOOK_INFO}/${id}`, {
        headers: {
          'Authorization': CookieService.readCookie(Cookies.AUTH),
        }
      });
      this.book = result.data;

      const genre = this.book.genre;
      const bookId = this.book.id;

      const result2 = await axios.get(`http://localhost:8000/api/recommendation?genre=${genre}&id=${bookId}`);
      const data2 = result2.data[0];
      const list = data2.recommendations as string;
      const ids = JSON.parse(list);

      const allMovies = (await axios.get('http://localhost:8000/api/books')).data;
      const selectedMovies = allMovies.filter((item: any) => {
        return ids.includes(item.id);
      });

      this.reccomendations = selectedMovies;
      this.onFetchBook();
    });
  }

  /* https://stackoverflow.com/a/60803005/10805602 */
  async onFetchBook() {
    const matches = this.book.youtubeLink.split(/v=/g);

    if (matches != null) {
      const url = `https://www.youtube.com/embed/${matches[1]}`
      this.youtubeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    const matches2 = this.book.audioBook.split(/v=/g);

    if (matches2 != null) {
      const url = `https://www.youtube.com/embed/${matches2[1]}`
      this.youtubeAudioUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

}
