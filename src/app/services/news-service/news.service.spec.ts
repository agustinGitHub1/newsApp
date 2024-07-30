import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { GENERAL_CONSTANTS } from 'src/assets/constants/general-constants';

describe('NewsService', () => {
  let service: NewsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });

    service = TestBed.inject(NewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getNews', () => {
    it('should return news data on success', () => {
      const mockNews: NewsArticle = {
        status: 'ok',
        totalResults: 1,
        articles: [
          {
            source: { id: '1', name: 'Test Source' },
            author: 'Test Author',
            title: 'Test Title',
            description: 'Test Description',
            url: 'http://example.com',
            urlToImage: 'http://example.com/image.jpg',
            publishedAt: new Date(),
            content: 'Test Content'
          }
        ]
      };

      service.getNews().subscribe(data => {
        expect(data).toEqual(mockNews);
      });

      const req = httpTestingController.expectOne(`${service['newsBaseUrl']}?q=news&apiKey=${service['newsApiKey']}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockNews);
    });

    it('should handle error responses', () => {
      const errorMessage = `Http failure response for https://newsapi.org/v2/everything?q=news&apiKey=${GENERAL_CONSTANTS.NEWS_API_KEY}: 500 Server Error`;

      service.getNews().subscribe(
        () => fail('Expected an error, not news data'),
        (error) => {
          expect(error.message).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(`${service['newsBaseUrl']}?q=news&apiKey=${service['newsApiKey']}`);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getSearchedNews', () => {
    it('should return searched news data on success', () => {
      const query = 'angular';
      const mockNews: NewsArticle = {
        status: 'ok',
        totalResults: 1,
        articles: [
          {
            source: { id: '1', name: 'Test Source' },
            author: 'Test Author',
            title: 'Test Title',
            description: 'Test Description',
            url: 'http://example.com',
            urlToImage: 'http://example.com/image.jpg',
            publishedAt: new Date(),
            content: 'Test Content'
          }
        ]
      };

      service.getSearchedNews(query).subscribe(data => {
        expect(data).toEqual(mockNews);
      });

      const req = httpTestingController.expectOne(`${service['newsBaseUrl']}?q=${encodeURIComponent(query)}&apiKey=${service['newsApiKey']}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockNews);
    });

    it('should handle error responses', () => {
      const query = 'angular';

      const errorMessage = `Http failure response for https://newsapi.org/v2/everything?q=angular&apiKey=${GENERAL_CONSTANTS.NEWS_API_KEY}: 500 Server Error`;

      service.getSearchedNews(query).subscribe(
        () => fail('Expected an error, not news data'),
        (error) => {
          expect(error.message).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(`${service['newsBaseUrl']}?q=${encodeURIComponent(query)}&apiKey=${service['newsApiKey']}`);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

});
