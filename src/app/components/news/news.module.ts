import { NgModule } from '@angular/core';
import { NewsArticleComponent } from './pages/news-article-page/news-article.component';
import { NewsRoutingModule } from './news.routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeNewsComponent } from './pages/home/home-news-page.component';


@NgModule({
  imports: [CommonModule, HttpClientModule, NewsRoutingModule, SharedModule],
  exports: [],
  declarations: [NewsArticleComponent, HomeNewsComponent],
  providers: [],
})
export class NewsModule { }
