import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { getFormatedDate, setDefaultImage } from 'src/app/shared/helpers/helps';
import { IMAGE_URLS_CONSTANTS } from 'src/assets/images/imageUrls';

@Component({
  selector: 'app-news-article',
  templateUrl: 'news-article.component.html',
  styleUrls: ['news-article.component.css']
})

export class NewsArticleComponent implements OnInit {
  @Input() article: Article | null = {} as Article;

  originUrl: string = '';
  formatedDate: string = 'N/A';
  author: string = '';
  articleSearchedList: Article[] = [];
  defaultImg: string = IMAGE_URLS_CONSTANTS.NO_IMAGE_URL;

  constructor(private selectedCardService: SelectedCardService, private router: Router, private translateService: TranslationService) {}

  ngOnInit(): void {
    this.selectedCardService.selectedCard$.subscribe(article => {
      this.article = article;
      if (this.article) {
        this.formatedDate = getFormatedDate(this.article.publishedAt);
        this.translateAuthor();
      } else {
        this.router.navigate(['']);
      }
    });

    this.originUrl = history.state.originUrl ?? '';

    this.articleSearchedList = this.selectedCardService.getArticlesFromLocalStorage() ?? []
  }

  setDefaultImage(event: Event): void {
    setDefaultImage(event, this.defaultImg);
  }

  translateAuthor(): void {
    this.translateService.getTranslation('no-info-available').subscribe((translation: string) => {
      this.author = this.article?.author ?? translation;
    });
  }

  goBack() {
    this.selectedCardService.clearSelectedCard();
    if (this.originUrl === '/news-searched-list' && this.articleSearchedList != null) return this.router.navigate([`news-searched-list`], { state: { searchedList: this.articleSearchedList } });

    return this.router.navigateByUrl(this.originUrl);
  }
}

