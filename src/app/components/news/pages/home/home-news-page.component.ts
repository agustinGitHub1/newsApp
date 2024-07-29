import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { NewsService } from 'src/app/services/news-service/news.service';

@Component({
  selector: 'app-home-news',
  templateUrl: 'home-news-page.component.html',
  styleUrls: ['home-news-page.component.css']
})

export class HomeNewsComponent implements OnInit {
  news$!: Observable<NewsArticle>;
  news: Article[] = [];
  displayedNews: Article[] = [];
  isLoading: boolean = true;
  currentPage = 1;
  totalPages = 1;
  pageSize = 6;
  showErrorModal: boolean = false;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews().subscribe({
      next: (data: NewsArticle) => {
          this.news = data.articles?.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) || [];

          this.totalPages = Math.ceil(this.news.length / this.pageSize);

          this.loadPage(this.currentPage);

          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
      },
      error: (err) => {
        console.error('Error getting news:', err);
        this.isLoading = false;
        this.showErrorModal = true;
      }
    });
  }

  loadPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedNews = this.news.slice(startIndex, endIndex);
  }

  onPageChanged(page: number): void {
    this.loadPage(page);
  }

  handleCloseModal() {
    this.showErrorModal = false;
  }
}

