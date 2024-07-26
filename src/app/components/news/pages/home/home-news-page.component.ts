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

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews().subscribe({
      next: (data: NewsArticle) => {
        try {
          this.news = data.articles?.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) || [];
          console.log('NOTICIAS', this.news);
          this.displayedNews = this.news.slice(0, 6);
          setTimeout(() => {
            this.isLoading = false;
          }, 4000);
        } catch (error) {
          console.error('error proccessing data: ', error);
        }
      },
      error: (err) => {
        console.error('Error getting news:', err);
        this.isLoading = false;
      }
    });
  }
}

