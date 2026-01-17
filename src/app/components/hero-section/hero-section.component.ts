import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CounterStat {
  value: number;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent implements AfterViewInit {
  @ViewChild('backgroundImage') backgroundImage!: ElementRef<HTMLDivElement>;
  @ViewChild('heroText') heroText!: ElementRef<HTMLDivElement>;
  @Output() navbarReady = new EventEmitter<void>();
  
  showText = false;
  
  textParts = ['Wnętrze', 'do', 'kwadratu'];
  
  // Animated counters
  stats: CounterStat[] = [
    { value: 150, suffix: '+', label: 'zrealizowanych projektów', current: 0 },
    { value: 10, suffix: '', label: 'lat doświadczenia', current: 0 },
    { value: 98, suffix: '%', label: 'zadowolonych klientów', current: 0 }
  ];
  
  ngAfterViewInit() {
    // Start background zoom-out animation after short delay
    setTimeout(() => {
      if (this.backgroundImage) {
        // Add zoom-out class to trigger animation
        this.backgroundImage.nativeElement.classList.add('zoom-out');
      }
      
      // Show navbar and text after zoom animation starts
      setTimeout(() => {
        this.navbarReady.emit();
        this.showText = true;
        
        // Start counter animation after text appears
        setTimeout(() => {
          this.animateCounters();
        }, 1000);
      }, 800);
    }, 500);
  }
  
  animateCounters() {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    this.stats.forEach((stat, index) => {
      let frame = 0;
      const increment = stat.value / totalFrames;
      
      const counter = setInterval(() => {
        frame++;
        stat.current = Math.min(Math.round(increment * frame), stat.value);
        
        if (frame === totalFrames) {
          clearInterval(counter);
          stat.current = stat.value;
        }
      }, frameDuration);
    });
  }
  
  getPartDelay(index: number): string {
    return `${index * 0.4}s`;
  }
}

