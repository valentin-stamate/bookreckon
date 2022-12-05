import { Component } from '@angular/core';

@Component({
  selector: 'app-genre-selection-page',
  templateUrl: './genre-selection-page.component.html',
  styleUrls: ['./genre-selection-page.component.scss']
})
export class GenreSelectionPageComponent {
  onConfigureRequestSend(): any {
    // const mergedListOfSentiments = this.customSentiments.concat(this.sentiments.filter(item => item.checked).map(item => item.name));
    // const mergedListOfGenres = this.customGenres.concat(this.genres.filter(item => item.checked).map(item => item.name));
    // const body = {
    //   sentiments: mergedListOfSentiments,
    //   genres: mergedListOfGenres,
    // };
    // console.log(body);
  }
}
