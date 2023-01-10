export interface Sentiment {
  name: string;
  checked: boolean;
}

export interface UserSettings {
  id: number;
  username: string;
  email: string;
  sentiments: Sentiment[];
  genres: Genre[];
}

export interface PreferencePayload {
  genres: string[];
  sentiments: string[];
}

export interface Genre {
  name: string;
  checked: boolean;
}

export interface Book {
  id?: number;
  title: string;
  genre: string;
  authors: string;
  audioBook: string;
  cover: string;
  description: string;
  imdbLink: string;
  goodreadsLink: string;
  youtubeLink: string;
  rating: number;
  ratings: number;
  reviews: number;
}
