import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NewsService {
  private newsApiKey = '98d84fd00e044551af0c5099b7367829';
  private newsUrl = `https://newsapi.org/v2/everything?q=news&apiKey=${this.newsApiKey}`;

  constructor(private httpClient: HttpClient) { }

  getNews() {
    return this.httpClient.get<NewsArticle>(this.newsUrl).pipe(
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

  getOneNewArticle(sourceId: string, titleQuery: string) {
    return this.httpClient.get<NewsArticle>(this.newsUrl).pipe(
      catchError(this.handleError)
    );
  }

}
