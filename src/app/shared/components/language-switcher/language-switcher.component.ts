import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translate/translate.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent implements OnInit {
  selectedLanguage: string = 'en';

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language') || 'en';
    this.translationService.setLanguage(this.selectedLanguage);
  }

  changeLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      const language = selectElement.value;
      this.selectedLanguage = language;
      this.translationService.setLanguage(language);
      localStorage.setItem('language', language);
    }
  }
}
