import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";
import {AccountSettingsComponent} from "./pages/account-settings/account-settings.component";
import {BookComponent} from "./pages/book/book.component";
import {GenreSelectionPageComponent} from "./pages/genre-selection-page/genre-selection-page.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'genre-selection', component: GenreSelectionPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'account-settings', component: AccountSettingsComponent},
  {path: 'book', component: BookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
