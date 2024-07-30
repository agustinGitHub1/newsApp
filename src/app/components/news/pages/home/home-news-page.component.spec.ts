import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HomeNewsComponent } from './home-news-page.component';
import { NewsService } from 'src/app/services/news-service/news.service';
import { Article, NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { TranslationService } from 'src/app/services/translate/translate.service';
import { TranslatePipe } from 'src/app/shared/pipes/translate.pipe';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { ModalPopupComponent } from 'src/app/shared/components/modal-popup/modal-popup.component';

describe('HomeNewsComponent', () => {
  let component: HomeNewsComponent;
  let fixture: ComponentFixture<HomeNewsComponent>;
  let mockNewsService: jasmine.SpyObj<NewsService>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    const newsServiceSpy = jasmine.createSpyObj('NewsService', ['getNews']);

    const translationServiceSpy = jasmine.createSpyObj('TranslationService', ['getTranslation']);

    translationServiceSpy.getTranslation.and.callFake((key: string) => of(key));

    await TestBed.configureTestingModule({
      declarations: [HomeNewsComponent,
                      TranslatePipe,
                      CardComponent,
                      SpinnerComponent,
                      PaginatorComponent,
                      ModalPopupComponent,
                    ],
      providers: [
        { provide: NewsService, useValue: newsServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeNewsComponent);
    component = fixture.componentInstance;
    mockNewsService = TestBed.inject(NewsService) as jasmine.SpyObj<NewsService>;
    mockTranslationService = TestBed.inject(TranslationService) as jasmine.SpyObj<TranslationService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load news and handle success response', () => {
      const mockNews: NewsArticle = {
        articles: [
          {
            source: { id: 'Source Name', name: 'Source Name' },
            author: 'Author Name',
            title: 'Test Article',
            description: 'Article Description',
            url: 'http://example.com',
            urlToImage: 'http://example.com/image.jpg',
            publishedAt: new Date('2024-07-29T20:00:00Z'),
            content: 'Article Content'
          }
        ]
      };

      mockNewsService.getNews.and.returnValue(of(mockNews));

      expect(component.isLoading).toBeTrue();


      fixture.detectChanges();

      expect(component.news).toEqual(mockNews.articles!);

      expect(component.totalPages).toBe(1);

      expect(component.displayedNews).toEqual(mockNews.articles!);

    });

    it('should handle error response', () => {
      mockNewsService.getNews.and.returnValue(throwError(() => new Error('Network error')));

      fixture.detectChanges();

      expect(component.isLoading).toBeFalse();
      expect(component.showErrorModal).toBeTrue();
    });
  });

  describe('loadPage', () => {
    it('should load the correct page of news', () => {
      const mockNews: Article[] = [
        {
          source: { name: 'Source Name 1' },
          author: 'Author 1',
          title: 'Test Article 1',
          description: 'Article Description 1',
          url: 'http://example.com/1',
          urlToImage: 'http://example.com/image1.jpg',
          publishedAt: new Date('2024-07-29T20:00:00Z'),
          content: 'Article Content 1'
        },
        {
          source: { name: 'Source Name 2' },
          author: 'Author 2',
          title: 'Test Article 2',
          description: 'Article Description 2',
          url: 'http://example.com/2',
          urlToImage: 'http://example.com/image2.jpg',
          publishedAt: new Date('2024-07-30T20:00:00Z'),
          content: 'Article Content 2'
        }
      ];

      component.news = mockNews;
      component.pageSize = 1;
      component.loadPage(1);

      expect(component.displayedNews.length).toBe(1);
      expect(component.displayedNews[0].title).toBe('Test Article 1');
    });
  });

  describe('onPageChanged', () => {
    it('should change page and load new data', () => {
      const mockNews: Article[] = [
        {
          source: { name: 'Source Name 1' },
          author: 'Author 1',
          title: 'Test Article 1',
          description: 'Article Description 1',
          url: 'http://example.com/1',
          urlToImage: 'http://example.com/image1.jpg',
          publishedAt: new Date('2024-07-29T20:00:00Z'),
          content: 'Article Content 1'
        },
        {
          source: { name: 'Source Name 2' },
          author: 'Author 2',
          title: 'Test Article 2',
          description: 'Article Description 2',
          url: 'http://example.com/2',
          urlToImage: 'http://example.com/image2.jpg',
          publishedAt: new Date('2024-07-30T20:00:00Z'),
          content: 'Article Content 2'
        }
      ];

      component.news = mockNews;
      component.pageSize = 1;

      component.onPageChanged(2);

      expect(component.currentPage).toBe(2);
      expect(component.displayedNews.length).toBe(1);
      expect(component.displayedNews[0].title).toBe('Test Article 2');
    });
  });

  describe('handleCloseModal', () => {
    it('should close the error modal', () => {
      component.showErrorModal = true;

      component.handleCloseModal();

      expect(component.showErrorModal).toBeFalse();
    });
  });
});
