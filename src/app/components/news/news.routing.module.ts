import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeNewsComponent } from './pages/home/home-news-page.component';
import { NewsArticleComponent } from './pages/news-article-page/news-article.component';
import { NewsSearchedListPageComponent } from './pages/news-searched-list-page/news-searched-list-page.component';
import { BlankComponent } from 'src/app/shared/components/blank-component/blank-component.component';

const routes: Routes = [
  { path: '', component: HomeNewsComponent},
  { path: 'news-article', component: NewsArticleComponent },
  { path: 'news-searched-list', component: NewsSearchedListPageComponent },
  { path: 'refresh', component: BlankComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
