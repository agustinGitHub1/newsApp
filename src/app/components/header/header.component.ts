import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMAGE_URLS_CONSTANTS } from 'src/assets/images/imageUrls';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent {
  homeImg: string = IMAGE_URLS_CONSTANTS.HOME_IMG;

  constructor(private router: Router) {}

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }
}
