import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { SelectedCardService } from 'src/app/services/news-service/card-selected.service';

@Component({
  selector: 'app-news-searched-list-page',
  templateUrl: './news-searched-list-page.component.html',
  styleUrls: ['./news-searched-list-page.component.css']})

export class NewsSearchedListPageComponent implements OnInit {
  searchedQueryList: any = history.state.searchedList ?? '';
  currentPage: number = 1;
  pageSize = 6;
  totalPages = 1;
  displayedNews: Article[] = [];

  constructor(private router: Router, private selectedCardService: SelectedCardService) { }

  ngOnInit() {
    if (!this.searchedQueryList) {
      this.searchedQueryList = this.selectedCardService.getArticlesFromLocalStorage()
      this.selectedCardService.clearSelectedArticles();
    };

    this.selectedCardService.setSelectedArticles(this.searchedQueryList);
    this.totalPages = Math.ceil(this.searchedQueryList.length / this.pageSize);

    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedNews = this.searchedQueryList.slice(startIndex, endIndex);
  }

  onPageChanged(page: number): void {
    this.loadPage(page);
  }

  onCardClick() {
    this.selectedCardService.setSelectedArticles(this.searchedQueryList);
  }

  goBack() {
    this.selectedCardService.clearSelectedArticles();

    return this.router.navigate(['']);
  }
}
