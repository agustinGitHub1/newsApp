import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article, NewsArticle } from 'src/app/interfaces/news-interface/news.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectedCardService {
  private selectedCardSubject = new BehaviorSubject<Article | null>(null);
  selectedCard$ = this.selectedCardSubject.asObservable();

  setSelectedCard(article: Article) {
    this.selectedCardSubject.next(article);
    localStorage.setItem('selectedCard', JSON.stringify(article));
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
