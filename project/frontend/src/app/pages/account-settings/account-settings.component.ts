import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {Endpoints} from "../../service/endpoints";
import {Cookies, CookieService} from "../../service/cookie.service";
import {PreferencePayload, UserSettings} from "../../service/interfaces";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  userSettings: UserSettings = undefined as any;
  payload: any = {};

  constructor() { }

  ngOnInit(): void {
    this.refreshSettings();
  }

  async refreshSettings() {
    const result = await axios.get(Endpoints.USER_INFO, {
      headers: {
        "Authorization": CookieService.readCookie(Cookies.AUTH),
      }
    });

    this.userSettings = result.data;
  }

  onUpdatePayload(payload: PreferencePayload) {
    this.payload = payload;

    console.log(payload);
  }

  async onUpdatePreferences() {
    const result = await axios.put(Endpoints.EDIT_PREFERENCE, this.payload, {
      headers: {
        'Authorization': CookieService.readCookie(Cookies.AUTH),
      }
    });

    location.href = '/account-settings';
  }

}
