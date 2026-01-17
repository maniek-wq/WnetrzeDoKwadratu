import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      id="back-to-top-btn"
      [class.show]="isVisible"
      (click)="scrollToTop()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 99999;
      pointer-events: none;
    }
    
    :host #back-to-top-btn {
      pointer-events: auto;
    }
  `]
})
export class BackToTopComponent implements OnInit {
  isVisible = false;

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

