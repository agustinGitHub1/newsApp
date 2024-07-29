import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces/news-interface/news.interface';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';
import { IMAGE_URLS_CONSTANTS } from 'src/assets/images/imageUrls';
import { setDefaultImage } from '../../helpers/helps';
import { TranslationService } from 'src/app/services/translate/translate.service';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})

export class CardComponent implements OnInit {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() url: string = '';
  @Input() article: Article = {} as Article;

  author: string = '';
  defaultImg: string = IMAGE_URLS_CONSTANTS.NO_IMAGE_URL;

  constructor(private selectedCardService: SelectedCardService, private router: Router, private translateService: TranslationService) {}
  ngOnInit(): void {
    this.translateAuthor();
  }


  get imageUrl(): string {
    return this.image ? this.image : this.defaultImg;
  }

  setDefaultImage(event: Event): void {
    setDefaultImage(event, this.defaultImg);
  }

  translateAuthor(): void {
    this.translateService.getTranslation('no-info-available').subscribe((translation: string) => {
      this.author = this.article?.author ?? translation;
    });
  }

  onCardClick() {
    if (this.article) {
      this.selectedCardService.setSelectedCard(this.article);
      const originUrl = this.router.url;
      this.router.navigate(['news-article'], { state: { originUrl: originUrl } });
    }
  }
}
