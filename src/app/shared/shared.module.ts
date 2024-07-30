import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { BlankComponent } from './components/blank-component/blank-component.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [CardComponent,SpinnerComponent, BlankComponent, ThemeSwitcherComponent, TranslatePipe, LanguageSwitcherComponent, PaginatorComponent, ModalPopupComponent],
  declarations: [CardComponent, SpinnerComponent, BlankComponent, ThemeSwitcherComponent, TranslatePipe, LanguageSwitcherComponent, PaginatorComponent, ModalPopupComponent],
  providers: [],
})
export class SharedModule { }
