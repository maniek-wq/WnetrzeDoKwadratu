import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <!-- Decorative Square -->
        <div class="decorative-square">
          <span class="error-code">404</span>
        </div>
        
        <h1>Ups! Strona nie istnieje</h1>
        <p>Wygląda na to, że ta przestrzeń jeszcze nie została zaprojektowana.</p>
        
        <a href="/" class="back-home-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Wróć na stronę główną
        </a>
      </div>
      
      <!-- Background decoration -->
      <div class="bg-decoration">
        <div class="square sq-1"></div>
        <div class="square sq-2"></div>
        <div class="square sq-3"></div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F8F5F0;
      position: relative;
      overflow: hidden;
      padding: 40px;
    }
    
    .not-found-content {
      text-align: center;
      position: relative;
      z-index: 10;
    }
    
    /* Decorative Square with 404 */
    .decorative-square {
      width: 150px;
      height: 150px;
      border: 4px solid #8B7355;
      margin: 0 auto 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: rotateSquare 10s linear infinite;
      position: relative;
    }
    
    @keyframes rotateSquare {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(45deg); }
      50% { transform: rotate(45deg); }
      75% { transform: rotate(0deg); }
      100% { transform: rotate(0deg); }
    }
    
    .error-code {
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      font-weight: 900;
      color: #8B7355;
      animation: counterRotate 10s linear infinite;
    }
    
    @keyframes counterRotate {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(-45deg); }
      50% { transform: rotate(-45deg); }
      75% { transform: rotate(0deg); }
      100% { transform: rotate(0deg); }
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 36px;
      font-weight: 700;
      color: #2F2F2F;
      margin-bottom: 16px;
    }
    
    p {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      color: #666;
      margin-bottom: 40px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .back-home-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      background: #8B7355;
      color: white;
      text-decoration: none;
      font-weight: 600;
      border-radius: 50px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(139, 115, 85, 0.3);
    }
    
    .back-home-btn:hover {
      background: #D4A574;
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(139, 115, 85, 0.4);
    }
    
    .back-home-btn svg {
      width: 20px;
      height: 20px;
    }
    
    /* Background decorations */
    .bg-decoration {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
    }
    
    .square {
      position: absolute;
      border: 2px solid rgba(139, 115, 85, 0.1);
      animation: float 20s ease-in-out infinite;
    }
    
    .sq-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 5%;
      animation-delay: 0s;
    }
    
    .sq-2 {
      width: 150px;
      height: 150px;
      bottom: 15%;
      right: 10%;
      animation-delay: -7s;
    }
    
    .sq-3 {
      width: 100px;
      height: 100px;
      top: 20%;
      right: 20%;
      animation-delay: -14s;
    }
    
    @keyframes float {
      0%, 100% {
        transform: rotate(0deg) translateY(0);
      }
      25% {
        transform: rotate(10deg) translateY(-20px);
      }
      50% {
        transform: rotate(0deg) translateY(0);
      }
      75% {
        transform: rotate(-10deg) translateY(20px);
      }
    }
    
    @media (max-width: 768px) {
      .decorative-square {
        width: 120px;
        height: 120px;
      }
      
      .error-code {
        font-size: 36px;
      }
      
      h1 {
        font-size: 28px;
      }
      
      p {
        font-size: 18px;
      }
    }
  `]
})
export class NotFoundComponent {}


