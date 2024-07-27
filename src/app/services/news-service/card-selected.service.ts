import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article, NewsArticle } from 'src/app/interfaces/news-interface/news.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectedCardService {
  private selectedCardSubject = new BehaviorSubject<Article | null>(null);
  selectedCard$ = this.selectedCardSubject.asObservable();
  private selectedArticlesSubject = new BehaviorSubject<Article[]>([]);
  selectedArticles$ = this.selectedArticlesSubject.asObservable();

  setSelectedArticles(articles: Article[]) {
    this.selectedArticlesSubject.next(articles);
    localStorage.setItem('selectedArticles', JSON.stringify(articles));
  }


  setSelectedCard(article: Article) {
    this.selectedCardSubject.next(article);
    localStorage.setItem('selectedCard', JSON.stringify(article));
  }

  getArticlesFromLocalStorage(): Article[] {
    const articles = localStorage.getItem('selectedArticles');
    return articles ? JSON.parse(articles) : [];
  }

  clearSelectedArticles() {
    this.selectedArticlesSubject.next([]);
    localStorage.removeItem('selectedArticles');
  }

  getCardFromLocalStorage(): Article | null {
    const card = localStorage.getItem('selectedCard');
    return card ? JSON.parse(card) : null;
  }

  clearSelectedCard() {
    this.selectedCardSubject.next(null);
    localStorage.removeItem('selectedCard');
  }
}
