import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { NewsArticle } from 'src/app/interfaces/news-interface/news.interface';
import { NewsService } from 'src/app/services/news-service/news.service';
import { IMAGE_URLS_CONSTANTS } from 'src/assets/images/imageUrls';
import { ModalService } from '../../services/modal-error-service/modal-error.service';

@Component({
  selector: 'app-news-searcher',
  templateUrl: './news-searcher.component.html',
  styleUrls: ['./news-searcher.component.css']
})
export class NewsSearcherComponent implements OnInit {
  @Output() onDebounce = new EventEmitter<string>();
  searchResults: any[] = [];
  searchQuery: string = '';
  debouncer: Subject<string> = new Subject<string>();
  searchImg: string = IMAGE_URLS_CONSTANTS.SEARCH_IMG;
  errorTitleModal: string = '';
  showErrorModal: boolean = false;

  constructor(private newsService: NewsService, private router: Router, private modalService: ModalService) { }

  ngOnInit(): void {
    this.debouncer.pipe(
      debounceTime(200)
    ).subscribe(searchTerm => {
      this.searchQuery = searchTerm;
    });
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm)
  }

  onEnter()  {
    if (this.searchQuery) {
      this.newsService.getSearchedNews(this.searchQuery).subscribe(
        (data: NewsArticle) => {
          this.searchResults = data.articles || [];
          if (this.searchResults.length > 0) {
            this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
              this.router.navigate(['news-searched-list'], { state: { searchedList: this.searchResults } });
            });
          }
        },
        error => {
          console.error('Error fetching search results:', error);
          this.modalService.showError();
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  handleCloseModal() {
    this.showErrorModal = false;
  }
}
