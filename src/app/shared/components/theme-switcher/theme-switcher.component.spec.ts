import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeSwitcherComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with the theme from localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'theme') {
        return 'dark';
      }
      return null;
    });
    spyOn(document.body.classList, 'add');
    spyOn(document.body.classList, 'remove');

    component.ngOnInit();

    expect(component.isDarkTheme).toBeTrue();
    expect(document.body.classList.add).toHaveBeenCalledWith('dark-theme');
  });

  it('should toggle the theme and update localStorage and document.body', () => {
    spyOn(document.body.classList, 'toggle');
    spyOn(localStorage, 'setItem');

    component.toggleTheme();

    expect(component.isDarkTheme).toBeTrue();
    expect(document.body.classList.toggle).toHaveBeenCalledWith('dark-theme', true);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

    component.toggleTheme();

    expect(component.isDarkTheme).toBeFalse();
    expect(document.body.classList.toggle).toHaveBeenCalledWith('dark-theme', false);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should load the correct theme from localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'theme') {
        return 'light';
      }
      return null;
    });
    spyOn(document.body.classList, 'add');
    spyOn(document.body.classList, 'remove');

    component.ngOnInit();

    expect(component.isDarkTheme).toBeFalse();
    expect(document.body.classList.remove).toHaveBeenCalledWith('dark-theme');
  });
});
