import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { TranslatePipe } from '../../pipes/translate.pipe'; // Ajusta la ruta según sea necesario
import { of } from 'rxjs';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['setLanguage', 'getTranslation']);

    translationServiceSpy.getTranslation.and.returnValue(of('mock translation'));

    await TestBed.configureTestingModule({
      declarations: [ LanguageSwitcherComponent, TranslatePipe ],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy }
      ]
    })
    .compileComponents();

    translationServiceSpy = TestBed.inject(TranslationService) as jasmine.SpyObj<TranslationService>;
    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the language from localStorage', () => {
    localStorage.setItem('language', 'fr');
    component.ngOnInit();
    expect(translationServiceSpy.setLanguage).toHaveBeenCalledWith('fr');
  });

  it('should change language and update localStorage', () => {
    const selectElement = fixture.debugElement.query(By.css('select')).nativeElement as HTMLSelectElement;
    selectElement.value = 'es';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(translationServiceSpy.setLanguage).toHaveBeenCalledWith('es');
    expect(localStorage.getItem('language')).toBe('es');
  });
});
