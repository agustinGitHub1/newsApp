import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NewsService } from 'src/app/services/news-service/news.service';
import { NewsSearcherComponent } from './news-searcher.component';
import { NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { IMAGE_URLS_CONSTANTS } from 'src/assets/constants/imageUrls';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { ModalPopupComponent } from 'src/app/shared/components/modal-popup/modal-popup.component';

describe('NewsSearcherComponent', () => {
  let component: NewsSearcherComponent;
  let fixture: ComponentFixture<NewsSearcherComponent>;
  let newsServiceSpy: jasmine.SpyObj<NewsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    newsServiceSpy = jasmine.createSpyObj('NewsService', ['getSearchedNews']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['getTranslation']);


    await TestBed.configureTestingModule({
      declarations: [ NewsSearcherComponent, TranslatePipe, ModalPopupComponent ],
      providers: [
        { provide: NewsService, useValue: newsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: TranslationService, useValue: translationServiceSpy }
      ]
    })
    .compileComponents();
    translationServiceSpy.getTranslation.and.returnValue(of('translated text'));
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    expect(component.searchResults).toEqual([]);
    expect(component.searchQuery).toEqual('');
    expect(component.searchImg).toEqual(IMAGE_URLS_CONSTANTS.SEARCH_IMG);
    expect(component.errorTitleModal).toEqual('');
    expect(component.showErrorModal).toBeFalse();
  });

  it('should call onKeyPress and update searchQuery', () => {
    const searchTerm = 'test';
    component.onKeyPress(searchTerm);
    component.debouncer.subscribe(value => {
      expect(value).toBe(searchTerm);
    });
  });

  it('should call onEnter and navigate when searchQuery has value', async () => {
    const searchQuery = 'test';
    const mockArticles: NewsArticle = {
      articles: [{
        source: { id: 'source1', name: 'Source Name' },
        author: 'Author Name',
        title: 'Test Article',
        description: 'Test Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: new Date(),
        content: 'Test Content'
      }]
    };

    component.searchQuery = searchQuery;
    newsServiceSpy.getSearchedNews.and.returnValue(of(mockArticles));

    routerSpy.navigateByUrl.and.returnValue(Promise.resolve(true));
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await component.onEnter();

    expect(newsServiceSpy.getSearchedNews).toHaveBeenCalledWith(searchQuery);
    expect(component.searchResults).toEqual(mockArticles.articles!);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/refresh', { skipLocationChange: true });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['news-searched-list'], { state: { searchedList: mockArticles.articles } });
  });

  it('should set showErrorModal to true and log error on failed search', () => {
    const searchQuery = 'test';
    const error = new Error('Error fetching data');
    component.searchQuery = searchQuery;
    newsServiceSpy.getSearchedNews.and.returnValue(throwError(() => error));

    spyOn(console, 'error');

    component.onEnter();

    expect(newsServiceSpy.getSearchedNews).toHaveBeenCalledWith(searchQuery);
    expect(component.searchResults).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching search results:', error);
  });

  it('should set showErrorModal to false when handleCloseModal is called', () => {
    component.handleCloseModal();
    expect(component.showErrorModal).toBeFalse();
  });
});
