import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeNewsComponent } from './pages/home/home-news-page.component';
import { NewsArticleComponent } from './pages/news-article-page/news-article.component';


// localhost:4200/heroes
const routes: Routes = [
  { path: '', component: HomeNewsComponent},
  { path: 'news-article', component: NewsArticleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
