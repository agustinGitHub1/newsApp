import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NewsArticleComponent } from './news-article.component';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { Article } from 'src/app/interfaces/news-interface/news.interface';
import { getFormatedDate } from 'src/app/shared/helpers/helps';

describe('NewsArticleComponent', () => {
  let component: NewsArticleComponent;
  let fixture: ComponentFixture<NewsArticleComponent>;
  let selectedCardServiceSpy: jasmine.SpyObj<SelectedCardService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    selectedCardServiceSpy = jasmine.createSpyObj('SelectedCardService', [
      'selectedCard$',
      'getCardFromLocalStorage',
      'getArticlesFromLocalStorage',
      'clearSelectedCard'
    ]);
    selectedCardServiceSpy.selectedCard$ = of(null);
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['getTranslation']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ NewsArticleComponent ],
      providers: [
        { provide: SelectedCardService, useValue: selectedCardServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsArticleComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should navigate to home if no article is found in local storage', () => {
      spyOnProperty(window.history, 'state', 'get').and.returnValue({ originUrl: '' });

      selectedCardServiceSpy.selectedCard$ = of(null);
      selectedCardServiceSpy.getCardFromLocalStorage.and.returnValue(null);
      component.ngOnInit();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
    });

    it('should set article and formatted date if article is available', async () => {
      const mockArticle: Article = {
        source: { name: 'Source Name' },
        author: 'Author Name',
        title: 'Test Article',
        description: 'Article Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: new Date('2024-07-29T20:00:00Z'),
        content: 'Article Content'
      };

      spyOnProperty(window.history, 'state', 'get').and.returnValue({ originUrl: '' });

      selectedCardServiceSpy.selectedCard$ = of(mockArticle);
      selectedCardServiceSpy.getCardFromLocalStorage.and.returnValue(mockArticle);
      translationServiceSpy.getTranslation.and.returnValue(of('Translated Author'));

      spyOn(component, 'translateAuthor').and.callThrough();

      component.ngOnInit();

      await fixture.whenStable();

      expect(component.article).toEqual(mockArticle);
      expect(component.formatedDate).toBe(getFormatedDate(mockArticle.publishedAt));
      expect(component.translateAuthor).toHaveBeenCalled();
    });

    it('should set article searched list from local storage', () => {
      const mockArticles: Article[] = [
        {
          source: { name: 'Source Name' },
          author: 'Author Name',
          title: 'Test Article',
          description: 'Article Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: new Date('2024-07-29T20:00:00Z'),
          content: 'Article Content'
        }
      ];

      spyOnProperty(window.history, 'state', 'get').and.returnValue({ originUrl: '/news-searched-list' });


      selectedCardServiceSpy.getArticlesFromLocalStorage.and.returnValue(mockArticles);
      component.ngOnInit();
      expect(component.articleSearchedList).toEqual(mockArticles);
    });
  });

  describe('translateAuthor', () => {
    it('should set author to translation if author is not available in article', () => {
      const mockArticle: Article = {
        source: { name: 'Source Name' },
        author: null,
        title: 'Test Article',
        description: 'Article Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: new Date('2024-07-29T20:00:00Z'),
        content: 'Article Content'
      };
      component.article = mockArticle;
      translationServiceSpy.getTranslation.and.returnValue(of('No information available.'));
      component.translateAuthor();


      expect(component.author).toBe('No information available.');
    });

    it('should set author from article if available', () => {
      const mockArticle: Article = {
        source: { name: 'Source Name' },
        author: 'Original Author',
        title: 'Test Article',
        description: 'Article Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: new Date('2024-07-29T20:00:00Z'),
        content: 'Article Content'
      };
      component.article = mockArticle;
      translationServiceSpy.getTranslation.and.returnValue(of('Translated Author'));

      component.translateAuthor();

      expect(component.author).toBe(mockArticle.author!);
    });
  });

  describe('goBack', () => {
    beforeEach(() => {
    });

    it('should navigate to the origin URL', () => {
      component.originUrl = '/test-url';
      component.goBack();
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/test-url');
    });

    it('should navigate to news-searched-list with state if originUrl is /news-searched-list', () => {
      component.originUrl = '/news-searched-list';
      const mockArticleList: Article[] = [{
        source: { name: 'Source Name' },
        author: 'Author Name',
        title: 'Test Article',
        description: 'Article Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: new Date('2024-07-29T20:00:00Z'),
        content: 'Article Content'
      }];
      component.articleSearchedList = mockArticleList;

      component.goBack();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['news-searched-list'], { state: { searchedList: mockArticleList } });
    });

    it('should call clearSelectedCard method on goBack', () => {
      component.goBack();
      expect(selectedCardServiceSpy.clearSelectedCard).toHaveBeenCalled();
    });
  });
});
