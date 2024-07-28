import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'src/app/services/translate/translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(value: string, ...args: any[]): string {
    let translatedValue = value;

    this.translationService.getTranslation(value).subscribe(translation => {
      translatedValue = translation;
    });

    return translatedValue;
  }
}
