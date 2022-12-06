import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { GenreSelectionComponent } from './components/genre-selection/genre-selection.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { BookComponent } from './pages/book/book.component';
import {YouTubePlayerModule} from "@angular/youtube-player";
import { GenreSelectionPageComponent } from './pages/genre-selection-page/genre-selection-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    GenreSelectionComponent,
    NavbarComponent,
    HomeComponent,
    AccountSettingsComponent,
    HomeComponent,
    BookComponent,
    GenreSelectionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
