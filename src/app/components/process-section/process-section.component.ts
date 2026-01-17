import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-section.component.html',
  styleUrls: ['./process-section.component.css']
})
export class ProcessSectionComponent implements AfterViewInit {
  isVisible = false;
  
  steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Konsultacja',
      description: 'Bezpłatne spotkanie, podczas którego poznajemy Twoje potrzeby, styl życia i oczekiwania względem projektu.',
      icon: ''
    },
    {
      number: '02',
      title: 'Koncepcja',
      description: 'Przygotowujemy wstępne propozycje układu funkcjonalnego i moodboardy określające styl wnętrza.',
      icon: ''
    },
    {
      number: '03',
      title: 'Projektowanie',
      description: 'Tworzymy szczegółowy projekt z wizualizacjami 3D, rysunkami technicznymi i zestawieniami materiałów.',
      icon: ''
    },
    {
      number: '04',
      title: 'Realizacja',
      description: 'Wspieramy proces realizacji poprzez nadzór autorski i koordynację z wykonawcami.',
      icon: ''
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

