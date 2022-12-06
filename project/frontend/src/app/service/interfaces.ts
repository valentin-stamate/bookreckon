export interface Sentiment {
  name: string;
  checked: boolean;
}

export interface Genre {
  name: string;
  checked: boolean;
}

export interface Book {
  id: number;
  title: string;
  genre: string;
  authors: string;
  audioBook: string;
  photo: string;
  description: string;
  imdb: string;
  youtube: string;
}
