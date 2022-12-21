import { Component, OnInit } from '@angular/core';
import {CookieService} from "../../service/cookie.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onLogout() {
    CookieService.deleteAllCookies();

    location.href = '/login';
  }

}
