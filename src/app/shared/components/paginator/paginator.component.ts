
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: 'paginator.component.html',
  styleUrls: ['paginator.component.css']
})

export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
