import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslationService } from './translate.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TranslationService]
    });

    service = TestBed.inject(TranslationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should load translations for the default language on initialization', () => {
    const mockTranslations = { 'hello': 'Hello' };
    const req = httpMock.expectOne('/assets/i18n/en.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTranslations);

    service.getTranslation('hello').subscribe((translation: any) => {
      expect(translation).toBe('Hello');
    });
  });

  it('should return the key if the translation is not found', () => {
    const mockTranslations = { 'hello': 'Hello' };
    const req = httpMock.expectOne('/assets/i18n/en.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTranslations);

    service.getTranslation('nonexistent').subscribe((translation: any) => {
      expect(translation).toBe('nonexistent');
    });
  });
});
