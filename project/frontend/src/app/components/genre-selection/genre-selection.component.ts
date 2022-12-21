import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Genre, PreferencePayload, Sentiment, UserSettings} from "../../service/interfaces";

const defaultSentiments:Sentiment[] = [
  {name: "Happy", checked: false},
  {name: "Sad", checked: false},
  {name: "Scary", checked: false},
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

  @Input()
  userSettings: UserSettings = undefined as any;

  @Output()
  payloadEmitter = new EventEmitter<PreferencePayload>();

  customSentiments: string[] = [];
  customGenres:  string[] = [];
  constructor() { }

  ngOnInit(): void {
    if (this.userSettings == null) {
      return;
    }

    const sentiments = this.userSettings.sentiments;
    const genres = this.userSettings.genres;

    for (let sentiment of this.sentiments) {
      const found = sentiments.find(item => item.name.toLowerCase() === sentiment.name.toLowerCase());

      if (found != null) {
        sentiment.checked = true;
      }
    }

    for (let genre of this.genres) {
      const found = genres.find(item => item.name.toLowerCase() === genre.name.toLowerCase());

      if (found != null) {
        genre.checked = true;
      }
    }

    this.customSentiments = this.userSettings.sentiments
      .filter(item => {
        const found = this.sentiments.find(it => it.name === item.name);

        return !found;
      })
      .map(item => item.name);

    this.customGenres = this.userSettings.genres
      .filter(item => {
        const found = this.genres.find(it => it.name === item.name);

        return !found;
      })
      .map(item => item.name);
  }

  onPressedCheckboxSentiments(item: Sentiment): any {
    item.checked = !item.checked;
    this.onPayloadRefresh();
  }

  onPressedCheckboxGenres(item: Genre): any {
    item.checked = !item.checked;
    this.onPayloadRefresh();
  }

  addCustomSentiment(input: HTMLInputElement): any {
    const customSentimentValue = input.value;
    if (!this.customSentiments.includes(customSentimentValue) && customSentimentValue !== "") {
      const splittedInput = customSentimentValue.split(" ");
      this.customSentiments = this.customSentiments.concat(splittedInput);
      input.value = "";
    }

    this.onPayloadRefresh();
  }

  addCustomGenre(input: HTMLInputElement): any {
    const customGenreValue = input.value;
    if (!this.customGenres.includes(customGenreValue) && customGenreValue !== "") {
      const splittedInput = customGenreValue.split(" ");
      this.customGenres = this.customGenres.concat(splittedInput);
      input.value = "";
    }

    this.onPayloadRefresh();
  }

  deleteCustomSentiment(inputItem: string): any {
    this.customSentiments = this.customSentiments.filter(item => item !== inputItem);
    this.onPayloadRefresh();
  }

  deleteCustomGenre(inputItem: string): any {
    this.customGenres = this.customGenres.filter(item => item !== inputItem);
    this.onPayloadRefresh();
  }

  // onConfigureRequestSend(): any {
  //   const mergedListOfSentiments = this.customSentiments.concat(this.sentiments.filter(item => item.checked).map(item => item.name));
  //   const mergedListOfGenres = this.customGenres.concat(this.genres.filter(item => item.checked).map(item => item.name));
  //   const body = {
  //     sentiments: mergedListOfSentiments,
  //     genres: mergedListOfGenres,
  //   };
  //   console.log(body);
  // }

  onPayloadRefresh() {
    const payload: PreferencePayload = {
      genres: [],
      sentiments: [],
    }

    const checkedGenres: string[] = [];

    for (const genre of this.genres) {
      if (genre.checked) {
        checkedGenres.push(genre.name);
      }
    }

    for (const genre of this.customGenres) {
      checkedGenres.push(genre);
    }

    const checkedSentiments: string[] = [];

    for (const sentiment of this.sentiments) {
      if (sentiment.checked) {
        checkedSentiments.push(sentiment.name);
      }
    }

    for (const sentiment of this.customSentiments) {
      checkedSentiments.push(sentiment);
    }

    payload.genres = checkedGenres;
    payload.sentiments = checkedSentiments;

    this.payloadEmitter.emit(payload);
  }
}
