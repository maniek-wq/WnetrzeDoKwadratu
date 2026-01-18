import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lightbox-overlay" (click)="close()" *ngIf="isOpen">
      <div class="lightbox-container" (click)="$event.stopPropagation()">
        
        <!-- Close Button -->
        <button class="lightbox-close" (click)="close()" aria-label="Zamknij">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        
        <!-- Navigation Arrows -->
        <button class="lightbox-nav prev" (click)="prev()" *ngIf="images.length > 1" aria-label="Poprzednie">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <button class="lightbox-nav next" (click)="next()" *ngIf="images.length > 1" aria-label="Następne">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
        
        <!-- Image -->
        <div class="lightbox-image-wrapper">
          <img [src]="images[currentIndex]?.image" [alt]="images[currentIndex]?.title" class="lightbox-image">
        </div>
        
        <!-- Caption -->
        <div class="lightbox-caption" *ngIf="images[currentIndex]">
          <h3>{{ images[currentIndex].title }}</h3>
          <p>{{ images[currentIndex].description }}</p>
          <span class="lightbox-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
        </div>
        
      </div>
    </div>
  `,
  styles: [`
    .lightbox-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .lightbox-container {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .lightbox-close {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
    }
    
    .lightbox-close:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: rotate(90deg);
    }
    
    .lightbox-close svg {
      width: 24px;
      height: 24px;
    }
    
    .lightbox-nav {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
    }
    
    .lightbox-nav:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    .lightbox-nav.prev {
      left: 20px;
    }
    
    .lightbox-nav.next {
      right: 20px;
    }
    
    .lightbox-nav svg {
      width: 28px;
      height: 28px;
    }
    
    .lightbox-image-wrapper {
      max-width: 100%;
      max-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .lightbox-image {
      max-width: 100%;
      max-height: 70vh;
      object-fit: contain;
      border-radius: 8px;
      animation: zoomIn 0.3s ease;
    }
    
    @keyframes zoomIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    .lightbox-caption {
      text-align: center;
      padding: 20px;
      color: white;
    }
    
    .lightbox-caption h3 {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .lightbox-caption p {
      font-family: 'Cormorant Garamond', serif;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 12px;
    }
    
    .lightbox-counter {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }
    
    @media (max-width: 768px) {
      .lightbox-nav {
        width: 44px;
        height: 44px;
      }
      
      .lightbox-nav.prev {
        left: 10px;
      }
      
      .lightbox-nav.next {
        right: 10px;
      }
      
      .lightbox-close {
        top: 10px;
        right: 10px;
        width: 44px;
        height: 44px;
      }
      
      .lightbox-caption h3 {
        font-size: 20px;
      }
    }
  `]
})
export class LightboxComponent {
  @Input() images: any[] = [];
  @Input() currentIndex: number = 0;
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.isOpen) return;
    
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }

  close() {
    this.closed.emit();
    document.body.style.overflow = '';
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }
}



