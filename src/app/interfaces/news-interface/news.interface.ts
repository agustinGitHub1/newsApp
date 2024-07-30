export interface NewsArticle {
  status?:       string;
  totalResults?: number;
  articles?:     Article[];
}

export interface Article {
  source:      Source;
  author:      string | null;
  title:       string;
  description: string;
  url:         string;
  urlToImage:  string;
  publishedAt: Date;
  content:     string;
}

export interface Source {
  id?:   string;
  name?: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toNews(json: string): NewsArticle {
      return JSON.parse(json);
  }

  public static newsToJson(value: NewsArticle): string {
      return JSON.stringify(value);
  }
}
