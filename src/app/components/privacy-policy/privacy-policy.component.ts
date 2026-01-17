import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="privacy-overlay" (click)="close()">
      <div class="privacy-modal" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close()" aria-label="Zamknij">×</button>
        
        <h2>Polityka Prywatności</h2>
        
        <div class="privacy-content">
          <h3>1. Administrator danych</h3>
          <p>Administratorem Twoich danych osobowych jest Wnętrze do kwadratu.</p>
          
          <h3>2. Cele przetwarzania</h3>
          <p>Twoje dane osobowe przetwarzamy w celu:</p>
          <ul>
            <li>Odpowiedzi na Twoje zapytania przesłane przez formularz kontaktowy</li>
            <li>Przygotowania oferty i realizacji usług projektowych</li>
            <li>Wypełnienia obowiązków prawnych ciążących na administratorze</li>
          </ul>
          
          <h3>3. Podstawa prawna</h3>
          <p>Podstawą prawną przetwarzania danych jest Twoja zgoda (art. 6 ust. 1 lit. a RODO) oraz prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO).</p>
          
          <h3>4. Okres przechowywania</h3>
          <p>Twoje dane będą przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane, nie dłużej niż 3 lata od ostatniego kontaktu.</p>
          
          <h3>5. Twoje prawa</h3>
          <p>Masz prawo do:</p>
          <ul>
            <li>Dostępu do swoich danych</li>
            <li>Sprostowania danych</li>
            <li>Usunięcia danych ("prawo do bycia zapomnianym")</li>
            <li>Ograniczenia przetwarzania</li>
            <li>Przenoszenia danych</li>
            <li>Wniesienia sprzeciwu</li>
            <li>Cofnięcia zgody w dowolnym momencie</li>
          </ul>
          
          <h3>6. Kontakt</h3>
          <p>W sprawach związanych z ochroną danych osobowych możesz kontaktować się pod adresem: dokwadratu.w@gmail.com</p>
          
          <h3>7. Pliki cookies</h3>
          <p>Strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania oraz analizy ruchu. Możesz zarządzać ustawieniami cookies w swojej przeglądarce.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .privacy-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 20px;
    }
    
    .privacy-modal {
      background: white;
      border-radius: 16px;
      max-width: 700px;
      max-height: 80vh;
      overflow-y: auto;
      padding: 40px;
      position: relative;
    }
    
    .close-btn {
      position: absolute;
      top: 15px;
      right: 20px;
      background: none;
      border: none;
      font-size: 32px;
      cursor: pointer;
      color: #666;
      line-height: 1;
    }
    
    .close-btn:hover {
      color: #2F2F2F;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      color: #2F2F2F;
      margin-bottom: 30px;
    }
    
    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      color: #2F2F2F;
      margin-top: 25px;
      margin-bottom: 10px;
    }
    
    p, li {
      font-family: 'Cormorant Garamond', serif;
      font-size: 16px;
      line-height: 1.7;
      color: #666;
    }
    
    ul {
      padding-left: 20px;
      margin: 10px 0;
    }
    
    li {
      margin-bottom: 5px;
    }
    
    @media (max-width: 768px) {
      .privacy-modal {
        padding: 30px 20px;
      }
      
      h2 {
        font-size: 24px;
      }
    }
  `]
})
export class PrivacyPolicyComponent {
  close() {
    // This will be handled by the parent component
  }
}

