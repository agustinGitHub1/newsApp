import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsArticleComponent } from './components/news/pages/news-article-page/news-article.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/news/news.module').then(m => m.NewsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
