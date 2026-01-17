import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxComponent } from '../lightbox/lightbox.component';

interface Realization {
  id: number;
  title: string;
  location: string;
  year: string;
  visualization: string;  // Zdjęcie wizualizacji
  realization: string;    // Zdjęcie realizacji
  description: string;
}

@Component({
  selector: 'app-realizations-section',
  standalone: true,
  imports: [CommonModule, LightboxComponent],
  templateUrl: './realizations-section.component.html',
  styleUrls: ['./realizations-section.component.css']
})
export class RealizationsSectionComponent implements AfterViewInit {
  isVisible = false;
  currentSlide = 0;
  
  // Lightbox state
  lightboxOpen = false;
  lightboxIndex = 0;
  
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }
  
  realizations: Realization[] = [
    {
      id: 1,
      title: 'Kliniska Wielkie',
      location: 'Kliniska Wielkie',
      year: '2024',
      visualization: 'assets/images/vizG3.jpg',
      realization: 'assets/images/rlG3.jpg',
      description: 'Kompleksowy projekt wnętrz galerii sztuki'
    },
    {
      id: 2,
      title: 'Kliniska Wielkie',
      location: 'Kliniska Wielkie',
      year: '2024',
      visualization: 'assets/images/vizg5.jpg',
      realization: 'assets/images/rlg5.jpg',
      description: 'Kompleksowy projekt wnętrz galerii sztuki'
    },
    {
      id: 3,
      title: 'Kliniska Wielkie',
      location: 'Kliniska Wielkie',
      year: '2024',
      visualization: 'assets/images/viz1.jpg',
      realization: 'assets/images/rl1.jpg',
      description: 'Kompleksowy projekt wnętrz galerii sztuki'
    },
    {
      id: 4,
      title: 'Kliniska Wielkie',
      location: 'Kliniska Wielkie',
      year: '2024',
      visualization: 'assets/images/viz3.jpg',
      realization: 'assets/images/rl3.jpg',
      description: 'Kompleksowy projekt wnętrz galerii sztuki'
    },
    {
      id: 5,
      title: 'Kliniska Wielkie',
      location: 'Kliniska Wielkie',
      year: '2024',
      visualization: 'assets/images/x.jpg',
      realization: 'assets/images/rl2.jpg',
      description: 'Kompleksowy projekt wnętrz galerii sztuki'
    },
    {
      id: 6,
      title: 'Kliniska Wielkie',
      location: 'Kliniska Wielkie',
      year: '2024',
      visualization: 'assets/images/viz4.jpg',
      realization: 'assets/images/rl4.jpg',
      description: 'Kompleksowy projekt wnętrz galerii sztuki'
    }
  ];
  
  // Slider navigation
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.realizations.length;
  }
  
  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.realizations.length - 1 : this.currentSlide - 1;
  }
  
  goToSlide(index: number) {
    this.currentSlide = index;
  }
  
  // Dla lightboxa - przekształcamy realizacje na format oczekiwany przez lightbox
  get lightboxImages() {
    const images: any[] = [];
    this.realizations.forEach(r => {
      images.push({
        image: r.visualization,
        title: `${r.title} - Wizualizacja`,
        description: `${r.location} • ${r.year}`
      });
      images.push({
        image: r.realization,
        title: `${r.title} - Realizacja`,
        description: `${r.location} • ${r.year}`
      });
    });
    return images;
  }
  
  openLightbox(index: number) {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }
}

