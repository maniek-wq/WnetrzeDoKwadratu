import { Component, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

// ========================================
// 📧 KONFIGURACJA EMAILJS
// Uzupełnij poniższe wartości po konfiguracji w panelu EmailJS
// ========================================
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_wdk',      // np. 'service_gmail'
  TEMPLATE_ID: 'template_3arq60s',    // np. 'template_contact'
  PUBLIC_KEY: 'qSPtmwcJzP9Tt5uqV'       // klucz publiczny z Dashboard
};

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.css']
})
export class ContactSectionComponent implements AfterViewInit {
  isVisible = false;
  private fb = inject(FormBuilder);
  contactForm: FormGroup;
  
  // Stany formularza
  submitted = false;
  isLoading = false;
  errorMessage = '';
  showPrivacyPolicy = false;
  
  constructor(private el: ElementRef) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      privacyConsent: [false, Validators.requiredTrue]
    });
  }

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

  openPrivacyPolicy() {
    this.showPrivacyPolicy = true;
    document.body.style.overflow = 'hidden';
  }

  closePrivacyPolicy() {
    this.showPrivacyPolicy = false;
    document.body.style.overflow = '';
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        to_email: 'dokwadratu.w@gmail.com'
      };
      
      try {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
        
        console.log('✅ Email wysłany pomyślnie!');
        this.submitted = true;
        this.contactForm.reset();
        
        setTimeout(() => {
          this.submitted = false;
        }, 8000);
        
      } catch (error) {
        console.error('❌ Błąd wysyłania:', error);
        this.errorMessage = 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się bezpośrednio mailowo.';
      } finally {
        this.isLoading = false;
      }
    }
  }
}

