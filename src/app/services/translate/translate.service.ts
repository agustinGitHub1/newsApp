import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = new BehaviorSubject<{ [key: string]: string }>({});
  private currentLanguage = new BehaviorSubject<string>('en');


  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLanguage.value);
  }

  private loadTranslations(language: string): void {
    this.http.get<{ [key: string]: string }>(`/assets/i18n/${language}.json`)
      .subscribe(data => this.translations.next(data));
  }

  public setLanguage(language: string): void {
    this.currentLanguage.next(language);
    this.loadTranslations(language);
    localStorage.setItem('language', language);
  }

  public getTranslation(key: string): Observable<string> {
    return this.translations.asObservable().pipe(
      map(translations => translations[key] || key)
    );
  }
}
