import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [CardComponent,SpinnerComponent],
  declarations: [CardComponent, SpinnerComponent],
  providers: [],
})
export class SharedModule { }
