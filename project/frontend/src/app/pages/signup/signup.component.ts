import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {Endpoints} from "../../service/endpoints";
import {Cookies, CookieService} from "../../service/cookie.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async onFormSubmit(event: Event) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);

    const response = await axios.post(Endpoints.SIGNUP, formObject);
    const token = response.data;

    CookieService.setCookie(Cookies.AUTH, token);

    location.href = "/home";
  }

}
