import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scroll-progress-container">
      <div class="scroll-progress-bar" [style.width.%]="scrollProgress"></div>
    </div>
  `,
  styles: [`
    .scroll-progress-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: transparent;
      z-index: 9998;
    }
    
    .scroll-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #8B7355, #D4A574);
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px rgba(139, 115, 85, 0.5);
    }
  `]
})
export class ScrollProgressComponent {
  scrollProgress = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = window.scrollY;
    this.scrollProgress = (scrolled / windowHeight) * 100;
  }
}



