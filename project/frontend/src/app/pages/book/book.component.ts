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
  youtubeUrl: SafeUrl = '';

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

    console.log(this.youtubeUrl)

  }

}
