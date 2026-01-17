import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxComponent } from '../lightbox/lightbox.component';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  images?: string[]; // Dodatkowe zdjęcia dla slidera
  description: string;
  currentImageIndex?: number; // Aktualny index slidera
}

@Component({
  selector: 'app-portfolio-section',
  standalone: true,
  imports: [CommonModule, LightboxComponent],
  templateUrl: './portfolio-section.component.html',
  styleUrls: ['./portfolio-section.component.css']
})
export class PortfolioSectionComponent implements AfterViewInit {
  activeFilter: string = 'all';
  isVisible = false;
  showAll = false;
  
  // Lightbox state
  lightboxOpen = false;
  lightboxIndex = 0;
  lightboxImages: any[] = [];
  
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
  
  categories = [
    { id: 'all', label: 'Wszystkie' },
    { id: 'mieszkania', label: 'Mieszkania' },
    { id: 'domy', label: 'Domy' },
    { id: 'biura', label: 'Biura' },
    { id: 'inne', label: 'Inne' }
  ];
  
  projects: Project[] = [
    {
      id: 1,
      title: 'Galeria sztuki w Przemoczu',
      category: 'inne',
      image: 'assets/images/bg1.jpg',
      images: ['assets/images/bg1.jpg', 'assets/images/a.jpg', 'assets/images/b.jpg', 'assets/images/c.jpg', 'assets/images/d.jpg', 'assets/images/e.jpg', 'assets/images/f.jpg', 'assets/images/g.jpg', 'assets/images/h.jpg'],
      description: 'Przestrzeń dla sztuki i kreatywności',
      currentImageIndex: 0
    },
    {
      id: 2,
      title: 'Apartament',
      category: 'mieszkania',
      image: 'assets/images/i.jpg',
      images: ['assets/images/i.jpg', 'assets/images/j.jpg', 'assets/images/k.jpg', 'assets/images/l.jpg', 'assets/images/m.jpg', 'assets/images/n.jpg'],
      description: 'Industrialny charakter z nutą ciepła',
      currentImageIndex: 0
    },
    {
      id: 3,
      title: 'Mieszkanie w centrum',
      category: 'mieszkania',
      image: 'assets/images/z11.png',
      images: ['assets/images/z11.png', 'assets/images/z10.png', 'assets/images/z12.png', 'assets/images/z13.png', 'assets/images/z14.png'],
      description: 'Nowoczesne wnętrze z elementami industrialnymi',
      currentImageIndex: 0
    },
    {
      id: 4,
      title: 'Dom poza miastem',
      category: 'domy',
      image: 'assets/images/o.jpg',
      images: ['assets/images/o.jpg', 'assets/images/p.jpg', 'assets/images/r.jpg', 'assets/images/s.jpg', 'assets/images/t.jpg'],
      description: 'Elegancja i funkcjonalność w jednym',
      currentImageIndex: 0
    },
    {
      id: 5,
      title: 'Przestrzeń biurowa SEP',
      category: 'biura',
      image: 'assets/images/z6.png',
      images: ['assets/images/z6.png', 'assets/images/z7.jpg', 'assets/images/z8.jpg', 'assets/images/z9.png'],
      description: 'Przestrzeń sprzyjająca kreatywności',
      currentImageIndex: 0
    },
    {
      id: 6,
      title: 'Strefa nocna',
      category: 'mieszkania',
      image: 'assets/images/u.png',
      images: ['assets/images/u.png', 'assets/images/w.png', 'assets/images/x.png', 'assets/images/y.png', 'assets/images/z.png'],
      description: 'Eleganckie wnętrze w sercu miasta',
      currentImageIndex: 0
    },
    {
      id: 7,
      title: 'Restauracja Globus',
      category: 'inne',
      image: 'assets/images/z1.jpg',
      images: ['assets/images/z1.jpg', 'assets/images/z2.jpg', 'assets/images/z3.jpg', 'assets/images/z4.jpg', 'assets/images/z5.jpg'],
      description: 'Wyjątkowe wnętrze restauracji',
      currentImageIndex: 0
    }
  ];
  
  get filteredProjects(): Project[] {
    let result = this.projects;
    
    if (this.activeFilter !== 'all') {
      result = this.projects.filter(p => p.category === this.activeFilter);
    }
    
    // Jeśli showAll = false i filtr = 'all', pokaż tylko 3 pierwsze
    if (!this.showAll && this.activeFilter === 'all') {
      return result.slice(0, 3);
    }
    
    return result;
  }
  
  setFilter(categoryId: string) {
    this.activeFilter = categoryId;
    // Przy zmianie filtra na konkretną kategorię, pokaż wszystkie z tej kategorii
    if (categoryId !== 'all') {
      this.showAll = true;
    }
  }
  
  showAllProjects() {
    this.showAll = true;
  }
  
  // Slider navigation
  nextImage(project: Project, event: Event) {
    event.stopPropagation();
    if (project.images && project.images.length > 1) {
      project.currentImageIndex = ((project.currentImageIndex || 0) + 1) % project.images.length;
    }
  }
  
  prevImage(project: Project, event: Event) {
    event.stopPropagation();
    if (project.images && project.images.length > 1) {
      const current = project.currentImageIndex || 0;
      project.currentImageIndex = current === 0 ? project.images.length - 1 : current - 1;
    }
  }
  
  getCurrentImage(project: Project): string {
    if (project.images && project.images.length > 0) {
      return project.images[project.currentImageIndex || 0];
    }
    return project.image;
  }
  
  openLightbox(index: number) {
    const project = this.filteredProjects[index];
    
    // Jeśli projekt ma galerię zdjęć, użyj jej
    if (project.images && project.images.length > 1) {
      this.lightboxImages = project.images.map((img, i) => ({
        image: img,
        title: project.title,
        description: `${project.description} (${i + 1}/${project.images!.length})`
      }));
    } else {
      // Pojedyncze zdjęcie
      this.lightboxImages = [{
        image: project.image,
        title: project.title,
        description: project.description
      }];
    }
    
    this.lightboxIndex = 0;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }
}

