import { Component } from '@angular/core';
import { IMAGE_URLS_CONSTANTS } from 'src/assets/constants/imageUrls';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {
  imageError: string = IMAGE_URLS_CONSTANTS.SCREEN_ERROR;
}
