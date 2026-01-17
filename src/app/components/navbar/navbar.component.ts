import { Component, Input, HostListener, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() show: boolean = false;
  
  isMenuOpen: boolean = false;
  isHidden: boolean = false;
  lastScrollY: number = 0;
  
  menuItems = [
    { label: 'Projekty', route: '#projekty' },
    { label: 'Realizacje', route: '#realizacje' },
    { label: 'Usługi', route: '#uslugi' },
    { label: 'O nas', route: '#o-nas' },
    { label: 'Kontakt', route: '#kontakt' }
  ];
  
  constructor(private ngZone: NgZone) {}
  
  ngOnInit() {
    // Use ngZone.runOutsideAngular for better performance
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    });
  }
  
  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Only apply after navbar is shown and scrolled past 150px
    if (this.show && currentScrollY > 150) {
      if (currentScrollY > this.lastScrollY + 10) {
        // Scrolling DOWN - hide navbar
        this.ngZone.run(() => {
          this.isHidden = true;
        });
      } else if (currentScrollY < this.lastScrollY - 10) {
        // Scrolling UP - show navbar
        this.ngZone.run(() => {
          this.isHidden = false;
        });
      }
    } else {
      // At top - always show
      this.ngZone.run(() => {
        this.isHidden = false;
      });
    }
    
    this.lastScrollY = currentScrollY;
  }
  
  onHamburgerClick() {
    console.log('Hamburger clicked!');
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }
  
  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
  
  openContactForm() {
    this.closeMenu();
    // Przewiń do sekcji kontakt
    setTimeout(() => {
      const contactSection = document.getElementById('kontakt');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  
  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
}
