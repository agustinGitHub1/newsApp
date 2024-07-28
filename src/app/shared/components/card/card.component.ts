import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article, NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';
import { IMAGE_URLS_CONSTANTS } from 'src/assets/images/imageUrls';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})

export class CardComponent {

  @Input() title: string = '';
  @Input() image: string = '';
  @Input() url: string = '';
  @Input() article: Article = {} as Article;

  defaultImg: string = IMAGE_URLS_CONSTANTS.NO_IMAGE_URL;

  constructor(private selectedCardService: SelectedCardService, private router: Router) {}
  get imageUrl(): string {
    return this.image ? this.image : this.defaultImg;
  }

  setDefaultImage(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultImg;
  }


  onCardClick() {
    if (this.article) {
      this.selectedCardService.setSelectedCard(this.article);
      const originUrl = this.router.url;
      this.router.navigate(['news-article'], { state: { originUrl: originUrl } });
    }
  }
}
