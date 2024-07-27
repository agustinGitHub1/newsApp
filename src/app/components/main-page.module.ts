import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainPageRoutingModule } from './main-page-routing.module';
import { HeaderComponent } from './header/header.component';
import { NewsSearcherComponent } from './news-searcher/news-searcher.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule, MainPageRoutingModule, SharedModule],
  exports: [],
  declarations: [MainPageComponent, HeaderComponent, NewsSearcherComponent, FooterComponent],
  providers: [],
})
export class MainPageModule { }
