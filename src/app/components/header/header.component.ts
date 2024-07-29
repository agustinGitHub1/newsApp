import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMAGE_URLS_CONSTANTS } from 'src/assets/images/imageUrls';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit {
  homeImg: string = IMAGE_URLS_CONSTANTS.HOME_IMG;
  isMobile: boolean = false;
  menuVisible: boolean = false;

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit(): void {
    //this.onResize({ target: window } as unknown as Event);
  }

  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.setDeviceType(width);
  }

  setDeviceType(width: number) {
    this.isMobile = width < 768;
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.menuVisible) {
      this.toggleMenu(); // Cierra el menú si se hace clic fuera
    }
  }
}
