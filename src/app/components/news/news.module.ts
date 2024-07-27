import { NgModule } from '@angular/core';
import { NewsArticleComponent } from './pages/news-article-page/news-article.component';
import { NewsRoutingModule } from './news.routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeNewsComponent } from './pages/home/home-news-page.component';
import { NewsSearchedListPageComponent } from './pages/news-searched-list-page/news-searched-list-page.component';


@NgModule({
  imports: [CommonModule, NewsRoutingModule, SharedModule],
  exports: [],
  declarations: [NewsArticleComponent, HomeNewsComponent, NewsSearchedListPageComponent],
  providers: [],
})
export class NewsModule { }
