import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private errorSubject = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject.asObservable();

  showError() {
    this.errorSubject.next(true);
  }

  hideError() {
    this.errorSubject.next(false);
  }
}
