import { TestBed } from '@angular/core/testing';
import { SelectedCardService } from './card-selected.service';
import { Article } from 'src/app/interfaces/news-interface/news.interface';

describe('SelectedCardService', () => {
  let service: SelectedCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedCardService);
  });

  afterEach(() => {
    localStorage.removeItem('selectedArticles');
    localStorage.removeItem('selectedCard');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setSelectedArticles', () => {
    it('should update selectedArticles$ and localStorage', () => {
      const articles: Article[] = [
        {
          source: { name: 'Source Name' },
          author: 'Author Name',
          title: 'Test Article',
          description: 'Article Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: new Date(),
          content: 'Article Content'
        }
      ];

      service.setSelectedArticles(articles);

      service.selectedArticles$.subscribe((selectedArticles: any) => {
        expect(selectedArticles).toEqual(articles);
      });

      const localStorageArticles = localStorage.getItem('selectedArticles');
      expect(localStorageArticles).toEqual(JSON.stringify(articles));
    });
  });

  describe('setSelectedCard', () => {
    it('should update selectedCard$ and localStorage', () => {
      const article: Article = {
        source: { name: 'Source Name' },
        author: 'Author Name',
        title: 'Test Article',
        description: 'Article Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: new Date(),
        content: 'Article Content'
      };

      service.setSelectedCard(article);

      service.selectedCard$.subscribe((selectedCard: any) => {
        expect(selectedCard).toEqual(article);
      });

      const localStorageCard = localStorage.getItem('selectedCard');
      expect(localStorageCard).toEqual(JSON.stringify(article));
    });
  });

  describe('getArticlesFromLocalStorage', () => {
    it('should return articles from localStorage', () => {
      const now = new Date();
      const articles: Article[] = [
        {
          source: { name: 'Source Name' },
          author: 'Author Name',
          title: 'Test Article',
          description: 'Article Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: now,
          content: 'Article Content'
        }
      ];

      localStorage.setItem('selectedArticles', JSON.stringify(articles));

      const result = service.getArticlesFromLocalStorage();

      expect(result.length).toBe(articles.length);

      result.forEach((article, index) => {
        const originalArticle = articles[index];
        expect(article.source).toEqual(originalArticle.source);
        expect(article.author).toEqual(originalArticle.author);
        expect(article.title).toEqual(originalArticle.title);
        expect(article.description).toEqual(originalArticle.description);
        expect(article.url).toEqual(originalArticle.url);
        expect(article.urlToImage).toEqual(originalArticle.urlToImage);
        expect(article.content).toEqual(originalArticle.content);
      });
    });

    it('should return an empty array if no articles in localStorage', () => {
      const result = service.getArticlesFromLocalStorage();
      expect(result).toEqual([]);
    });
  });

  describe('clearSelectedArticles', () => {
    it('should clear selectedArticles$ and localStorage', () => {
      const articles: Article[] = [
        {
          source: { name: 'Source Name' },
          author: 'Author Name',
          title: 'Test Article',
          description: 'Article Description',
          url: 'http://example.com',
          urlToImage: 'http://example.com/image.jpg',
          publishedAt: new Date(),
          content: 'Article Content'
        }
      ];
      service.setSelectedArticles(articles);

      service.clearSelectedArticles();

      service.selectedArticles$.subscribe((selectedArticles: any) => {
        expect(selectedArticles).toEqual([]);
      });

      const localStorageArticles = localStorage.getItem('selectedArticles');
      expect(localStorageArticles).toBeNull();
    });
  });

  describe('getCardFromLocalStorage', () => {
    it('should return card from localStorage', () => {
      const now = new Date();
      const article: Article = {
        source: { name: 'Source Name' },
        author: 'Author Name',
        title: 'Test Article',
        description: 'Article Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: now,
        content: 'Article Content'
      };
      localStorage.setItem('selectedCard', JSON.stringify(article));

      const result = service.getCardFromLocalStorage();
      expect(result).toBeTruthy();
      if (result) {
        expect(result.source).toEqual(article.source);
        expect(result.author).toEqual(article.author);
        expect(result.title).toEqual(article.title);
        expect(result.description).toEqual(article.description);
        expect(result.url).toEqual(article.url);
        expect(result.urlToImage).toEqual(article.urlToImage);
        expect(result.content).toEqual(article.content);
      }
    });

    it('should return null if no card in localStorage', () => {
      const result = service.getCardFromLocalStorage();
      expect(result).toBeNull();
    });
  });

  describe('clearSelectedCard', () => {
    it('should clear selectedCard$ and localStorage', () => {
      const article: Article = {
        source: { name: 'Source Name' },
        author: 'Author Name',
        title: 'Test Article',
        description: 'Article Description',
        url: 'http://example.com',
        urlToImage: 'http://example.com/image.jpg',
        publishedAt: new Date(),
        content: 'Article Content'
      };
      service.setSelectedCard(article);

      service.clearSelectedCard();

      service.selectedCard$.subscribe((selectedCard: any) => {
        expect(selectedCard).toBeNull();
      });

      const localStorageCard = localStorage.getItem('selectedCard');
      expect(localStorageCard).toBeNull();
    });
  });
});
