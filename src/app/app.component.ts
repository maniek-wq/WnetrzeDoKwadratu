import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PortfolioSectionComponent } from './components/portfolio-section/portfolio-section.component';
import { RealizationsSectionComponent } from './components/realizations-section/realizations-section.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { FooterSectionComponent } from './components/footer-section/footer-section.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { ScrollProgressComponent } from './components/scroll-progress/scroll-progress.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { ProcessSectionComponent } from './components/process-section/process-section.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HeroSectionComponent, 
    NavbarComponent, 
    PortfolioSectionComponent,
    RealizationsSectionComponent,
    ServicesSectionComponent,
    AboutSectionComponent,
    ContactSectionComponent,
    FooterSectionComponent,
    LoadingScreenComponent,
    ScrollProgressComponent,
    BackToTopComponent,
    FaqSectionComponent,
    TestimonialsSectionComponent,
    ProcessSectionComponent,
    CookieBannerComponent
  ],
  template: `
    <!-- Loading Screen -->
    <app-loading-screen *ngIf="isLoading" (loadingComplete)="onLoadingComplete()"></app-loading-screen>
    
    <!-- Scroll Progress Bar -->
    <app-scroll-progress *ngIf="!isLoading"></app-scroll-progress>
    
    <!-- Back to Top Button - always rendered -->
    <app-back-to-top></app-back-to-top>
    
    <!-- Cookie Banner -->
    <app-cookie-banner *ngIf="!isLoading"></app-cookie-banner>
    
    <div class="min-h-screen">
      <app-navbar [show]="showNavbar"></app-navbar>
      <app-hero-section (navbarReady)="onNavbarReady()"></app-hero-section>
      <app-portfolio-section></app-portfolio-section>
      <app-realizations-section></app-realizations-section>
      <app-services-section></app-services-section>
      <app-process-section></app-process-section>
      <app-about-section></app-about-section>
      <app-testimonials-section></app-testimonials-section>
      <app-faq-section></app-faq-section>
      <app-contact-section></app-contact-section>
      <app-footer-section></app-footer-section>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Wnętrze do kwadratu';
  showNavbar = false;
  isLoading = true;
  
  onNavbarReady() {
    this.showNavbar = true;
  }
  
  onLoadingComplete() {
    this.isLoading = false;
  }
}

