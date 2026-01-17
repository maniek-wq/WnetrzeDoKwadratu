import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
  @Output() loadingComplete = new EventEmitter<void>();
  
  isHiding = false;
  isHidden = false;

  ngOnInit() {
    // Symulacja ładowania (min 2s, max do załadowania strony)
    setTimeout(() => {
      this.hideLoader();
    }, 2000);
  }

  hideLoader() {
    this.isHiding = true;
    setTimeout(() => {
      this.isHidden = true;
      this.loadingComplete.emit();
    }, 600); // Czas animacji fade-out
  }
}


