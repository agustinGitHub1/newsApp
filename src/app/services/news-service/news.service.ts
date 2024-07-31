import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { catchError, throwError } from 'rxjs';
import { GENERAL_CONSTANTS } from 'src/assets/constants/general-constants';

@Injectable({providedIn: 'root'})
export class NewsService {
  private newsApiKey = GENERAL_CONSTANTS.NEWS_API_KEY;
  private newsBaseUrl = `https://newsapi.org/v2/everything`;

  constructor(private httpClient: HttpClient) {}

  getNews() {
    return this.httpClient.get<NewsArticle>(`${this.newsBaseUrl}?q=news&apiKey=${this.newsApiKey}`).pipe(
      catchError(this.handleError)
    );
  }

  getSearchedNews(query: string) {
    const encodedQuery = encodeURIComponent(query);

    return this.httpClient.get<NewsArticle>(`${this.newsBaseUrl}?q=${encodedQuery}&apiKey=${this.newsApiKey}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }

}
