import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TranslatePipe } from './translate.pipe';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { of } from 'rxjs';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['getTranslation']);
    TestBed.configureTestingModule({
      providers: [
        TranslatePipe,
        { provide: TranslationService, useValue: translationServiceSpy }
      ]
    });
    pipe = TestBed.inject(TranslatePipe);
  });

  it('should translate text', fakeAsync(() => {
    const mockTranslation = 'Hola';
    translationServiceSpy.getTranslation.and.returnValue(of(mockTranslation));

    const result = pipe.transform('Hello');
    tick();

    expect(translationServiceSpy.getTranslation).toHaveBeenCalledWith('Hello');
    expect(result).toBe(mockTranslation);
  }));

  it('should return the same text if no translation is available', fakeAsync(() => {
    const mockTranslation = '';
    translationServiceSpy.getTranslation.and.returnValue(of(mockTranslation));

    const result = pipe.transform('Hello');
    tick();

    expect(translationServiceSpy.getTranslation).toHaveBeenCalledWith('Hello');
    expect(result).toBe(mockTranslation);
  }));
});
