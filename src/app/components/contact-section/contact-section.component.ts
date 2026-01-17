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

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFiles = Array.from(input.files);
      
      // Limit: maksymalnie 5 plików, każdy max 5MB (zmniejszone z 10MB)
      const maxFiles = 5;
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      for (const file of newFiles) {
        if (this.selectedFiles.length >= maxFiles) {
          alert(`Maksymalnie ${maxFiles} zdjęć.`);
          break;
        }
        
        if (file.size > maxSize) {
          alert(`Plik "${file.name}" jest za duży. Maksymalny rozmiar: 5MB.`);
          continue;
        }
        
        if (!file.type.startsWith('image/')) {
          alert(`Plik "${file.name}" nie jest zdjęciem.`);
          continue;
        }
        
        // Zmniejsz zdjęcie przed dodaniem (maksymalnie 800px szerokości, quality 0.8)
        const resizedFile = await this.compressImage(file);
        this.selectedFiles.push(resizedFile);
        
        // Tworzenie preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.filePreviews.push({
            name: file.name,
            size: resizedFile.size,
            url: e.target.result
          });
        };
        reader.readAsDataURL(resizedFile);
      }
      
      // Reset input
      input.value = '';
    }
  }

  compressImage(file: File): Promise<File> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 800;
          const maxHeight = 800;
          
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            0.8 // quality 80%
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
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
      
      // Przygotowanie informacji o zdjęciach (dodawane do głównej wiadomości)
      let attachmentsInfo = '';
      
      if (this.selectedFiles.length > 0) {
        attachmentsInfo = `\n\n📎 ZAŁĄCZONE ZDJĘCIA (${this.selectedFiles.length}):\n`;
        this.selectedFiles.forEach((file, index) => {
          attachmentsInfo += `${index + 1}. ${file.name} (${this.formatFileSize(file.size)})\n`;
        });
        attachmentsInfo += '\n(Uwaga: Zdjęcia zostały przesłane przez formularz. Skontaktuj się z klientem bezpośrednio, aby je otrzymać.)';
      }
      
      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message + attachmentsInfo,
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
        
      } catch (error: any) {
        console.error('❌ Błąd wysyłania:', error);
        
        // Lepsze komunikaty błędów
        let errorMsg = 'Wystąpił błąd podczas wysyłania wiadomości. ';
        
        if (error?.status === 400) {
          errorMsg += 'Prawdopodobnie dane są zbyt duże (zdjęcia). Spróbuj zmniejszyć rozmiar zdjęć lub wyślij mniej plików.';
        } else if (error?.status === 429) {
          errorMsg += 'Zbyt wiele żądań. Poczekaj chwilę i spróbuj ponownie.';
        } else if (error?.status === 500) {
          errorMsg += 'Problem po stronie serwera. Spróbuj ponownie za chwilę.';
        } else {
          errorMsg += 'Spróbuj ponownie lub skontaktuj się bezpośrednio mailowo.';
        }
        
        this.errorMessage = errorMsg;
      } finally {
        this.isLoading = false;
      }
    }
  }
}

