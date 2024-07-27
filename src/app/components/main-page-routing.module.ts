import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
   {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
