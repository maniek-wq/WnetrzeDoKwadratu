import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxComponent } from '../lightbox/lightbox.component';

interface Realization {
  id: number;
  title: string;
  location: string;
  year: string;
  image: string;
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
      title: 'Apartament Premium',
      location: 'Warszawa, Mokotów',
      year: '2024',
      image: 'assets/images/bg1.jpg',
      description: 'Kompleksowy projekt wnętrz apartamentu 120m² w stylu nowoczesnym'
    },
    {
      id: 2,
      title: 'Dom Jednorodzinny',
      location: 'Konstancin-Jeziorna',
      year: '2024',
      image: 'assets/images/bg1.jpg',
      description: 'Eleganckie wnętrza domu 280m² z dbałością o każdy detal'
    },
    {
      id: 3,
      title: 'Penthouse z Tarasem',
      location: 'Warszawa, Śródmieście',
      year: '2023',
      image: 'assets/images/bg1.jpg',
      description: 'Luksusowy penthouse 200m² z panoramicznym widokiem na miasto'
    },
    {
      id: 4,
      title: 'Mieszkanie Rodzinne',
      location: 'Warszawa, Wilanów',
      year: '2023',
      image: 'assets/images/bg1.jpg',
      description: 'Funkcjonalne wnętrze dla rodziny z dwójką dzieci'
    }
  ];
  
  // Dla lightboxa - przekształcamy realizacje na format oczekiwany przez lightbox
  get lightboxImages() {
    return this.realizations.map(r => ({
      image: r.image,
      title: r.title,
      description: `${r.location} • ${r.year}`
    }));
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

