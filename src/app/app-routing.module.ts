import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsArticleComponent } from './components/news/pages/news-article-page/news-article.component';
import { MainPageModule } from './components/main-page.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/main-page.module').then(m => m.MainPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
