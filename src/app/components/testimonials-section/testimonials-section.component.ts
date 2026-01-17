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
      name: 'Milena',
      role: 'Kliniska Wielkie',
      content: 'Zleciłam projekt sypialni i salonu. Praca od koncepcji poprzez projektowanie aż po realizację w pełni profesjonalna, uwzględniająca potrzeby i pomysły moje i męża. Przestrzeń wygląda dokładnie tak jak sobie wymarzyłam, a dziewczyny pomogły mi to zwizualizować. Polecam z całego serca.',
      rating: 5,
      image: 'assets/images/bg1.jpg'
    },
    {
      name: 'Karolina',
      role: 'Szczecin, Centrum',
      content: 'Mieszkanie było w totalnym remoncie i nie wiedziałam od czego zacząć. Natalia i Julia pomogły mi uporządkować chaos - zaczęły od rozmowy o moim stylu życia, a potem pokazały kilka wizualizacji. Wybrałam wariant który idealnie pasuje do mnie. Teraz każdy kto wchodzi pyta kto projektował - tak pięknie to wygląda!',
      rating: 5,
      image: 'assets/images/bg1.jpg'
    },
    {
      name: 'Tomasz',
      role: 'Polic',
      content: 'Mieliśmy dom który wyglądał jak z lat 90. Chcieliśmy go odświeżyć ale nie chcieliśmy tracić tego klimatu. Dziewczyny zaproponowały połączenie starych mebli z nowoczesnymi akcentami. Efekt? Dom wygląda jak z katalogu ale nadal jest nasz - ciepły i swojski. Najlepsze że wszystko zmieściliśmy w budżecie.',
      rating: 5,
      image: 'assets/images/bg1.jpg'
    },
    {
      name: 'Magdalena',
      role: 'Goleniów',
      content: 'Przeprowadzałam się do nowego mieszkania i potrzebowałam szybkiego projektu. Miałam konkretny budżet i terminy. Natalia i Julia wszystko dopięły na ostatni guzik - projekt gotowy w 2 tygodnie, wykonawcy poleceni, materiały dobrane. Zero stresu z mojej strony. To jest ten typ współpracy jakiej szukałam.',
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


