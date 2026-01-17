import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cookie-banner" *ngIf="showBanner" [class.hiding]="isHiding">
      <div class="cookie-content">
        <div class="cookie-text">
          <span class="cookie-icon">🍪</span>
          <p>
            Używamy plików cookies, aby zapewnić najlepsze wrażenia na naszej stronie. 
            Kontynuując przeglądanie, zgadzasz się na ich użycie.
            <a href="#" (click)="openPrivacyInfo($event)">Dowiedz się więcej</a>
          </p>
        </div>
        <div class="cookie-buttons">
          <button class="btn-accept" (click)="acceptCookies()">Akceptuję</button>
          <button class="btn-decline" (click)="declineCookies()">Tylko niezbędne</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #2F2F2F;
      color: white;
      padding: 20px;
      z-index: 9999;
      box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.2);
      animation: slideUp 0.4s ease;
    }
    
    .cookie-banner.hiding {
      animation: slideDown 0.3s ease forwards;
    }
    
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    
    @keyframes slideDown {
      from { transform: translateY(0); }
      to { transform: translateY(100%); }
    }
    
    .cookie-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      flex-wrap: wrap;
    }
    
    .cookie-text {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      flex: 1;
    }
    
    .cookie-icon {
      font-size: 28px;
      flex-shrink: 0;
    }
    
    .cookie-text p {
      font-size: 14px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
    }
    
    .cookie-text a {
      color: #D4A574;
      text-decoration: underline;
    }
    
    .cookie-text a:hover {
      color: #F8F5F0;
    }
    
    .cookie-buttons {
      display: flex;
      gap: 12px;
      flex-shrink: 0;
    }
    
    .btn-accept {
      padding: 12px 24px;
      background: #8B7355;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-accept:hover {
      background: #D4A574;
    }
    
    .btn-decline {
      padding: 12px 24px;
      background: transparent;
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-decline:hover {
      border-color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.05);
    }
    
    @media (max-width: 768px) {
      .cookie-content {
        flex-direction: column;
        text-align: center;
      }
      
      .cookie-text {
        flex-direction: column;
        align-items: center;
      }
      
      .cookie-buttons {
        width: 100%;
        flex-direction: column;
      }
      
      .btn-accept, .btn-decline {
        width: 100%;
      }
    }
  `]
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;
  isHiding = false;

  ngOnInit() {
    // Check if user already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      setTimeout(() => {
        this.showBanner = true;
      }, 1500);
    }
  }

  acceptCookies() {
    this.hideBanner();
    localStorage.setItem('cookieConsent', 'accepted');
    // Here you would enable analytics, etc.
  }

  declineCookies() {
    this.hideBanner();
    localStorage.setItem('cookieConsent', 'declined');
    // Only essential cookies
  }

  openPrivacyInfo(event: Event) {
    event.preventDefault();
    // Scroll to contact section which has privacy policy
    const kontaktSection = document.getElementById('kontakt');
    if (kontaktSection) {
      kontaktSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private hideBanner() {
    this.isHiding = true;
    setTimeout(() => {
      this.showBanner = false;
    }, 300);
  }
}

