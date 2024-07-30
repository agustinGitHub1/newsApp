import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit pageChanged event when changePage is called with a valid page', () => {
    spyOn(component.pageChanged, 'emit');

    const page = 2;
    component.totalPages = 3;
    component.changePage(page);

    expect(component.pageChanged.emit).toHaveBeenCalledWith(page);
  });

  it('should not emit pageChanged event when changePage is called with an invalid page', () => {
    spyOn(component.pageChanged, 'emit');

    const invalidPage = 0;
    component.totalPages = 3;
    component.changePage(invalidPage);

    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('should call window.scrollTo with the correct options when changePage is called', () => {
    spyOn(window, 'scrollTo').and.callThrough();

    const page = 2;
    component.totalPages = 3;
    component.changePage(page);

    expect(window.scrollTo).toHaveBeenCalled();
    const callArgs = (window.scrollTo as jasmine.Spy).calls.mostRecent().args[0];
    expect(callArgs).toEqual(jasmine.objectContaining({
      top: 0,
      behavior: 'smooth'
    }));
  });
});
