import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.css']
})
export class TestimonialsSectionComponent implements AfterViewInit {
  isVisible = false;
  currentSlide = 0;
  
  testimonials: Testimonial[] = [
    {
      name: 'Anna Kowalska',
      role: 'Właścicielka apartamentu, Warszawa',
      content: 'Współpraca z Wnętrze do kwadratu to czysta przyjemność. Zespół doskonale zrozumiał moje potrzeby i stworzył przestrzeń, która przewyższyła moje oczekiwania. Polecam każdemu, kto ceni profesjonalizm i kreatywność.',
      rating: 5,
      image: 'assets/images/bg1.jpg'
    },
    {
      name: 'Marcin Nowak',
      role: 'Właściciel domu, Kraków',
      content: 'Projektanci z WDK potrafią słuchać i przekładać marzenia na rzeczywistość. Nasz dom zyskał nowy charakter — nowoczesny, ale przytulny. Szczególnie cenię ich dbałość o detale i terminowość.',
      rating: 5,
      image: 'assets/images/bg1.jpg'
    },
    {
      name: 'Katarzyna Wiśniewska',
      role: 'Właścicielka biura, Gdańsk',
      content: 'Zleciliśmy projekt naszego biura i jesteśmy zachwyceni efektem. Pracownicy chwalą nową przestrzeń, a klienci są pod wrażeniem. Inwestycja, która się zwróciła wielokrotnie.',
      rating: 5,
      image: 'assets/images/bg1.jpg'
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

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.testimonials.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}

