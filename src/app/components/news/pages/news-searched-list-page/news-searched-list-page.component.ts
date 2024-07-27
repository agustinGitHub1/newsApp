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
  itemsPerPage: number = 10;

  constructor(private router: Router, private selectedCardService: SelectedCardService) { }

  ngOnInit() {
    if (!this.searchedQueryList) {
      this.searchedQueryList = this.selectedCardService.getArticlesFromLocalStorage()
      this.selectedCardService.clearSelectedArticles();
    };

    this.selectedCardService.setSelectedArticles(this.searchedQueryList);
  }

   get paginatedArticles(): Article[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.searchedQueryList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.searchedQueryList.length / this.itemsPerPage);
  }


  onCardClick() {
    this.selectedCardService.setSelectedArticles(this.searchedQueryList);
  }

  goBack() {
    this.selectedCardService.clearSelectedArticles();

    return this.router.navigate(['']);
  }
}
