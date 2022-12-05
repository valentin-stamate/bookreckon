import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Genre, Sentiment} from "../../service/interfaces";

const defaultSentiments:Sentiment[] = [
  {name: "happy", checked: false},
  {name: "sad", checked: false},
  {name: "aldehida", checked: false},
];
const defaultGenres:Genre[] = [
  {name: "Action", checked: false},
  {name: "Drama", checked: false},
  {name: "Fantasy", checked: false},
];

@Component({
  selector: 'app-genre-selection',
  templateUrl: './genre-selection.component.html',
  styleUrls: ['./genre-selection.component.scss']
})
export class GenreSelectionComponent implements OnInit {
  sentiments = defaultSentiments;
  genres = defaultGenres;

  customSentiments: string[] = [];
  customGenres:  string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onPressedCheckboxSentiments(item: Sentiment): any {
    item.checked = !item.checked;
    console.log(this.sentiments);
  }

  onPressedCheckboxGenres(item: Genre): any {
    item.checked = !item.checked;
    console.log(this.genres);
  }

  addCustomSentiment(input: HTMLInputElement): any {
    const customSentimentValue = input.value;
    if (!this.customSentiments.includes(customSentimentValue) && customSentimentValue !== "") {
      const splittedInput = customSentimentValue.split(" ");
      this.customSentiments = this.customSentiments.concat(splittedInput);
      input.value = "";
    }
    console.log(this.customSentiments);
  }

  addCustomGenre(input: HTMLInputElement): any {
    const customGenreValue = input.value;
    if (!this.customGenres.includes(customGenreValue) && customGenreValue !== "") {
      const splittedInput = customGenreValue.split(" ");
      this.customGenres = this.customGenres.concat(splittedInput);
      input.value = "";
    }
    console.log(this.customGenres);
  }

  deleteCustomSentiment(inputItem: string): any {
    const alteredCustomSentiments = this.customSentiments.filter(item => item !== inputItem);
    this.customSentiments = alteredCustomSentiments;
  }

  deleteCustomGenre(inputItem: string): any {
    const alteredCustomGenre = this.customGenres.filter(item => item !== inputItem);
    this.customGenres = alteredCustomGenre;
  }

  onConfigureRequestSend(): any {
    const mergedListOfSentiments = this.customSentiments.concat(this.sentiments.filter(item => item.checked).map(item => item.name));
    const mergedListOfGenres = this.customGenres.concat(this.genres.filter(item => item.checked).map(item => item.name));
    const body = {
      sentiments: mergedListOfSentiments,
      genres: mergedListOfGenres,
    };
    console.log(body);
  }
}
