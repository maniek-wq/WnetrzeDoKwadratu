import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.css']
})
export class FaqSectionComponent implements AfterViewInit {
  isVisible = false;
  
  faqItems: FaqItem[] = [
    {
      question: 'Ile trwa realizacja projektu wnętrza?',
      answer: 'Czas realizacji zależy od zakresu projektu. Projekt funkcjonalny to ok. 2-3 tygodnie, projekt koncepcyjny 4-6 tygodni, a projekt kompleksowy 6-10 tygodni. Dokładny harmonogram ustalamy indywidualnie po poznaniu szczegółów.',
      isOpen: false
    },
    {
      question: 'Czy mogę zamówić projekt tylko jednego pomieszczenia?',
      answer: 'Oczywiście! Projektujemy zarówno całe mieszkania i domy, jak i pojedyncze pomieszczenia — salony, kuchnie, łazienki czy sypialnie. Każdy projekt traktujemy indywidualnie.',
      isOpen: false
    },
    {
      question: 'Jak wygląda pierwsza konsultacja?',
      answer: 'Pierwsza konsultacja jest bezpłatna i trwa ok. 30-45 minut. Podczas spotkania (online lub stacjonarnie) poznajemy Twoje potrzeby, styl życia, preferencje estetyczne i budżet. Na tej podstawie proponujemy optymalny zakres współpracy.',
      isOpen: false
    },
    {
      question: 'Czy pomagacie w zakupie mebli i materiałów?',
      answer: 'Tak! W ramach projektu kompleksowego przygotowujemy szczegółowe zestawienia produktów z linkami do sklepów. Na życzenie możemy również towarzyszyć podczas zakupów lub zamówić produkty w Twoim imieniu.',
      isOpen: false
    },
    {
      question: 'Czy oferujecie nadzór autorski nad realizacją?',
      answer: 'Tak, nadzór autorski to opcja dostępna w projekcie kompleksowym. Obejmuje wizyty na budowie, konsultacje z wykonawcami i kontrolę zgodności realizacji z projektem. Dzięki temu masz pewność, że efekt końcowy będzie zgodny z wizualizacjami.',
      isOpen: false
    },
    {
      question: 'Ile wizyt na budowie jest wliczonych w cenę projektu?',
      answer: 'Pierwsze trzy wizyty na budowie są wliczone w cenę projektu. Każda dodatkowa wizyta jest płatna: od 300 do 500 zł za wizytę miejscową (w tym samym mieście) oraz od 500 do 800 zł za wizytę zamiejscową (poza miastem). Szczegóły ustalamy indywidualnie.',
      isOpen: false
    },
    {
      question: 'Jaki jest koszt projektu wnętrza?',
      answer: 'Ceny zaczynają się od 100 zł/m² za projekt funkcjonalny, 120 zł/m² za projekt koncepcyjny i 150 zł/m² za projekt kompleksowy. Dokładną wycenę przygotowujemy po zapoznaniu się z zakresem prac i metrażem.',
      isOpen: false
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

  toggleFaq(index: number) {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}

