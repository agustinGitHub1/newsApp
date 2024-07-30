import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CardComponent } from './card.component';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { Article } from 'src/app/interfaces/news-interface/news.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSelectedCardService: jasmine.SpyObj<SelectedCardService>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSelectedCardService = jasmine.createSpyObj('SelectedCardService', ['setSelectedCard']);
    mockTranslationService = jasmine.createSpyObj('TranslationService', ['getTranslation']);

    mockTranslationService.getTranslation.and.returnValue(of('Author Not Available'));

    await TestBed.configureTestingModule({
      declarations: [CardComponent, TranslatePipe],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: SelectedCardService, useValue: mockSelectedCardService },
        { provide: TranslationService, useValue: mockTranslationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.article = { title: 'Test Article', author: 'Test Author' } as Article;

    (component as any).router = mockRouter;

    fixture.detectChanges();
  });

  it('should call setSelectedCard and navigate on card click', () => {
    const originUrl = '/test-url';

    mockRouter.navigate.and.callFake((url, options) => {
      expect(url).toEqual(['news-article']);
      expect(options).toEqual({ state: { originUrl: originUrl } });
      return Promise.resolve(true);
    });

    (component as any).router.url = originUrl;

    component.onCardClick();

    expect(mockSelectedCardService.setSelectedCard).toHaveBeenCalledWith(component.article);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['news-article'], { state: { originUrl: originUrl } });
  });
});
