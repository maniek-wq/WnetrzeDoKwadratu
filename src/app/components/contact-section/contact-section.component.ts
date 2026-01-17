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
  
  selectedFiles: File[] = [];
  filePreviews: { name: string; size: number; url: string }[] = [];

  constructor(private el: ElementRef) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      privacyConsent: [false, Validators.requiredTrue]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFiles = Array.from(input.files);
      
      // Limit: maksymalnie 5 plików, każdy max 10MB
      const maxFiles = 5;
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      for (const file of newFiles) {
        if (this.selectedFiles.length >= maxFiles) {
          alert(`Maksymalnie ${maxFiles} zdjęć.`);
          break;
        }
        
        if (file.size > maxSize) {
          alert(`Plik "${file.name}" jest za duży. Maksymalny rozmiar: 10MB.`);
          continue;
        }
        
        if (!file.type.startsWith('image/')) {
          alert(`Plik "${file.name}" nie jest zdjęciem.`);
          continue;
        }
        
        this.selectedFiles.push(file);
        
        // Tworzenie preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.filePreviews.push({
            name: file.name,
            size: file.size,
            url: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
      
      // Reset input
      input.value = '';
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.filePreviews.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
      
      // Przygotowanie informacji o zdjęciach
      let attachmentsInfo = '';
      if (this.selectedFiles.length > 0) {
        attachmentsInfo = `\n\n📎 ZAŁĄCZONE ZDJĘCIA (${this.selectedFiles.length}):\n`;
        this.selectedFiles.forEach((file, index) => {
          attachmentsInfo += `${index + 1}. ${file.name} (${this.formatFileSize(file.size)})\n`;
        });
        attachmentsInfo += '\nUwaga: Zdjęcia są widoczne poniżej w tej wiadomości jako linki do podglądu.';
      }
      
      // Tworzenie HTML z podglądem zdjęć
      let photosHtml = '';
      if (this.filePreviews.length > 0) {
        photosHtml = '<br><br><strong>📎 Załączone zdjęcia:</strong><br>';
        this.filePreviews.forEach((preview, index) => {
          photosHtml += `<br><strong>${index + 1}. ${preview.name}</strong><br>`;
          photosHtml += `<img src="${preview.url}" alt="${preview.name}" style="max-width: 400px; height: auto; border: 1px solid #ddd; border-radius: 8px; margin-top: 10px;"><br>`;
        });
      }
      
      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message + attachmentsInfo,
        photos_html: photosHtml,
        attachments_count: this.selectedFiles.length.toString(),
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
        this.selectedFiles = [];
        this.filePreviews = [];
        
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

