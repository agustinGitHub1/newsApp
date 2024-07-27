import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { BlankComponent } from './components/blank-component/blank-component.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [CardComponent,SpinnerComponent, BlankComponent, ThemeSwitcherComponent],
  declarations: [CardComponent, SpinnerComponent, BlankComponent, ThemeSwitcherComponent],
  providers: [],
})
export class SharedModule { }
