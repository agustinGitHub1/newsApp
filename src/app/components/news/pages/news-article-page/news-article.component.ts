import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/news-interface/news.interface';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';

@Component({
  selector: 'app-news-article',
  templateUrl: 'news-article.component.html',
  styleUrls: ['news-article.component.css']
})

export class NewsArticleComponent implements OnInit {
  @Input() article: Article | null = {} as Article;

  private originUrl: string = '';
  formatedDate: string = '';

  constructor(private selectedCardService: SelectedCardService, private router: Router) { }

  ngOnInit(): void {
    this.selectedCardService.selectedCard$.subscribe(article => {
      this.article = article;
    });

    this.article = this.selectedCardService.getCardFromLocalStorage();

    if (!this.article) this.router.navigate(['']);

    this.formatedDate = new Date(this.article!.publishedAt).toLocaleDateString();

    this.originUrl = history.state.originUrl ?? '';
  }

  goBack() {
    console.log('URL ORIGINAL',this.originUrl);
    this.selectedCardService.clearSelectedCard();
    return this.router.navigateByUrl(this.originUrl);
  }
}

