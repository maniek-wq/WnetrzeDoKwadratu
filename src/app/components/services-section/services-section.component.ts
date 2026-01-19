import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  imageStyle: 'sketch-bw' | 'sketch-color' | 'full-color';
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.css']
})
export class ServicesSectionComponent implements AfterViewInit {
  isVisible = false;
  
  services: Service[] = [
    {
      title: 'PROJEKT FUNKCJONALNY',
      price: '100 zł/m²',
      image: 'assets/images/szkic.png',
      description: 'Projekt wnętrz oparty na pomiarach pomieszczenia, zapewniający optymalne wykorzystanie przestrzeni.',
      features: ['Koncepcja funkcjonalna (2-3 warianty)', 'Układy ścian działowych', 'Rozmieszczenie mebli', 'Widoki 3D'],
      imageStyle: 'sketch-bw'
    },
    {
      title: 'PROJEKT KONCEPCYJNY',
      price: '120 zł/m²',
      image: 'assets/images/d_sketch.png',
      description: 'Wizualizacja marzeń. Określamy styl, kolorystykę i klimat przyszłego wnętrza.',
      features: ['Moodboardy', 'Wizualizacje 3D', 'Dobór kolorystyki', 'Stylistyka wnętrza'],
      imageStyle: 'sketch-color'
    },
    {
      title: 'PROJEKT KOMPLEKSOWY',
      price: '150 zł/m²',
      image: 'assets/images/d.jpg',
      description: 'Pełne wsparcie od A do Z — od pierwszych szkiców po nadzór nad realizacją.',
      features: ['Dokumentacja techniczna', 'Zestawienia materiałowe', 'Nadzór autorski*'],
      imageStyle: 'full-color'
    }
  ];

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
}

