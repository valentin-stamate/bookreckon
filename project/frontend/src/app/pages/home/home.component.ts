import { Component } from '@angular/core';
import {Book} from "../../service/interfaces";
import axios from "axios";
import {Endpoints} from "../../service/endpoints";
import {Cookies, CookieService} from "../../service/cookie.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  books: Book[] = [];

  ngOnInit() {
    this.refreshRecommendations();
  }

  async refreshRecommendations() {
    const token = CookieService.readCookie(Cookies.AUTH);

    const result = await axios.get(Endpoints.RECOMMENDATION, {
      headers: {
        'Authorization': token,
      }
    });

    this.books = result.data;
  }

}
