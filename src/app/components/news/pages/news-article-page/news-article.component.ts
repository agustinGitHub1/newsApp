import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';
import { getFormatedDate } from 'src/app/shared/helpers/helps';

@Component({
  selector: 'app-news-article',
  templateUrl: 'news-article.component.html',
  styleUrls: ['news-article.component.css']
})

export class NewsArticleComponent implements OnInit {
  @Input() article: Article | null = {} as Article;

  private originUrl: string = '';
  formatedDate: string = 'N/A';
  author: string = '';
  articleSearchedList: Article[] = [];

  constructor(private selectedCardService: SelectedCardService, private router: Router) {}

  ngOnInit(): void {
    this.selectedCardService.selectedCard$.subscribe(article => {
      this.article = article;
    });

    this.article = this.selectedCardService.getCardFromLocalStorage();
    if (!this.article) this.router.navigate(['']);

    this.formatedDate = getFormatedDate(this.article!.publishedAt!);
    this.author=  this.article?.author ?? 'No information available';
    this.originUrl = history.state.originUrl ?? '';

    this.articleSearchedList = this.selectedCardService.getArticlesFromLocalStorage() ?? [];
  }

  goBack() {
    this.selectedCardService.clearSelectedCard();
    if (this.originUrl === '/news-searched-list' && this.articleSearchedList != null) return this.router.navigate([`news-searched-list`], { state: { searchedList: this.articleSearchedList } });

    return this.router.navigateByUrl(this.originUrl);
  }
}

