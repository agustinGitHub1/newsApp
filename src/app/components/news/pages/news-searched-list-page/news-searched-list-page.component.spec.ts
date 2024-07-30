import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NewsSearchedListPageComponent } from './news-searched-list-page.component';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';
import { Article } from 'src/app/interfaces/news-interface/news.interface';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';

describe('NewsSearchedListPageComponent', () => {
  let component: NewsSearchedListPageComponent;
  let fixture: ComponentFixture<NewsSearchedListPageComponent>;
  let selectedCardServiceSpy: jasmine.SpyObj<SelectedCardService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    const spyCardService = jasmine.createSpyObj('SelectedCardService', [
      'getArticlesFromLocalStorage',
      'setSelectedArticles',
      'clearSelectedArticles'
    ]);

    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    const translationServiceSpy = jasmine.createSpyObj('TranslationService', ['getTranslation']);

    await TestBed.configureTestingModule({
      declarations: [ NewsSearchedListPageComponent, TranslatePipe, PaginatorComponent ],
      providers: [
        { provide: SelectedCardService, useValue: spyCardService },
        { provide: Router, useValue: spyRouter },
        { provide: TranslationService, useValue: translationServiceSpy }
      ]
    })
    .compileComponents();
    translationServiceSpy.getTranslation.and.returnValue(of('translated text'));
    selectedCardServiceSpy = TestBed.inject(SelectedCardService) as jasmine.SpyObj<SelectedCardService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    Object.defineProperty(window, 'history', {
      value: {
        state: {
          searchedList: [{
            source: { name: 'Source Name' },
            author: 'Author Name',
            title: 'Test Article',
            description: 'Article Description',
            url: 'http://example.com',
            urlToImage: 'http://example.com/image.jpg',
            publishedAt: new Date('2024-07-29T20:00:00Z'),
            content: 'Article Content'
          }]
        }
      }
    });

    fixture = TestBed.createComponent(NewsSearchedListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchedQueryList from history.state or service', () => {
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

    (window.history.state as any).searchedList = null;
    selectedCardServiceSpy.getArticlesFromLocalStorage.and.returnValue(mockArticles);

    component.ngOnInit();

    expect(component.searchedQueryList).toEqual(mockArticles);
    expect(selectedCardServiceSpy.setSelectedArticles).toHaveBeenCalledWith(mockArticles);
    expect(component.totalPages).toBe(1);
  });

  it('should handle page load correctly', () => {
    const mockArticles: Article[] = Array.from({ length: 20 }, (_, i) => ({
      source: { name: `Source ${i + 1}` },
      author: `Author ${i + 1}`,
      title: `Article ${i + 1}`,
      description: `Description ${i + 1}`,
      url: `http://example.com/${i + 1}`,
      urlToImage: `http://example.com/image-${i + 1}.jpg`,
      publishedAt: new Date(`2024-07-29T20:00:00Z`),
      content: `Content ${i + 1}`
    }));

    component.searchedQueryList = mockArticles;
    component.pageSize = 5;

    component.loadPage(2);

    expect(component.currentPage).toBe(2);
    expect(component.displayedNews.length).toBe(5);
    expect(component.displayedNews[0].title).toBe('Article 6');
  });

  it('should call onPageChanged and load the correct page', () => {
    const mockArticles: Article[] = Array.from({ length: 20 }, (_, i) => ({
      source: { name: `Source ${i + 1}` },
      author: `Author ${i + 1}`,
      title: `Article ${i + 1}`,
      description: `Description ${i + 1}`,
      url: `http://example.com/${i + 1}`,
      urlToImage: `http://example.com/image-${i + 1}.jpg`,
      publishedAt: new Date(`2024-07-29T20:00:00Z`),
      content: `Content ${i + 1}`
    }));

    component.searchedQueryList = mockArticles;
    component.pageSize = 5;

    spyOn(component, 'loadPage').and.callThrough();

    component.onPageChanged(3);

    expect(component.loadPage).toHaveBeenCalledWith(3);
    expect(component.currentPage).toBe(3);
  });

  it('should call onCardClick and set selected articles', () => {
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

    component.searchedQueryList = mockArticles;

    component.onCardClick();

    expect(selectedCardServiceSpy.setSelectedArticles).toHaveBeenCalledWith(mockArticles);
  });

  it('should navigate to home and clear selected articles on goBack', () => {
    component.goBack();

    expect(selectedCardServiceSpy.clearSelectedArticles).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
