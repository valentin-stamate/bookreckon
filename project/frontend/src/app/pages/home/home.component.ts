import { Component } from '@angular/core';
import {Book} from "../../service/interfaces";
import axios from "axios";
import {Endpoints} from "../../service/endpoints";
import {Cookies, CookieService} from "../../service/cookie.service";
import {JwtService} from "../../service/jwt.service";

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
    const user = JwtService.decodeJWT(token);

    const result = await axios.get(`http://localhost:8000/api/user_recommendation?id=${user.id}`);
    const data = result.data[0];

    const str = data.recommendations;
    const moviesIds = JSON.parse(str) as number[];

    const allMovies = (await axios.get('http://localhost:8000/api/books')).data;
    const selectedMovies = allMovies.filter((item: any) => {
      return moviesIds.includes(item.id);
    });

    console.dir(selectedMovies);

    this.books = selectedMovies;
  }

}
