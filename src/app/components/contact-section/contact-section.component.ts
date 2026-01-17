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

// ========================================
// ☁️ KONFIGURACJA CLOUDINARY
// 1. Załóż konto na cloudinary.com (darmowe 25GB)
// 2. Dashboard → Settings → Upload → Upload presets
// 3. Utwórz "Unsigned" preset (bez autoryzacji)
// 4. Skopiuj Cloud Name i Upload Preset poniżej
// ========================================
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'dcdbqkdu6',        // np. 'dokwadratu'
  UPLOAD_PRESET: 'wnetrze_upload'   // np. 'wnetrze_upload'
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

  async uploadToCloudinary(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);
      formData.append('folder', 'wnetrze-do-kwadratu/contact-form');
      
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/image/upload`);
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url); // URL do zdjęcia
        } else {
          let errorMsg = `Upload failed: ${xhr.statusText}`;
          if (xhr.status === 401) {
            errorMsg = '401 Unauthorized - Sprawdź czy preset "wnetrze_upload" jest ustawiony jako "Unsigned" w Cloudinary';
          }
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            if (errorResponse.error?.message) {
              errorMsg += ` (${errorResponse.error.message})`;
            }
          } catch (e) {}
          reject(new Error(errorMsg));
        }
      };
      
      xhr.onerror = () => {
        reject(new Error('Network error during upload'));
      };
      
      xhr.send(formData);
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      let uploadedPhotoUrls: string[] = [];
      
      // Upload zdjęć do Cloudinary
      if (this.selectedFiles.length > 0) {
        try {
          this.errorMessage = 'Przesyłanie zdjęć...';
          
          for (const file of this.selectedFiles) {
            const url = await this.uploadToCloudinary(file);
            uploadedPhotoUrls.push(url);
          }
          
          this.errorMessage = '';
        } catch (error: any) {
          console.error('❌ Błąd uploadu zdjęć:', error);
          
          let errorMsg = 'Błąd podczas przesyłania zdjęć. ';
          
          if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
            errorMsg += 'Błąd autoryzacji Cloudinary. Sprawdź czy preset "wnetrze_upload" istnieje i jest ustawiony jako "Unsigned" w Cloudinary Dashboard.';
          } else if (error.message?.includes('Network error')) {
            errorMsg += 'Problem z połączeniem. Sprawdź internet i spróbuj ponownie.';
          } else {
            errorMsg += 'Spróbuj ponownie lub wyślij wiadomość bez zdjęć.';
          }
          
          this.errorMessage = errorMsg;
          this.isLoading = false;
          return;
        }
      }
      
      // Przygotowanie informacji o zdjęciach z linkami
      let attachmentsInfo = '';
      let photosHtml = '';
      
      if (uploadedPhotoUrls.length > 0) {
        attachmentsInfo = `\n\n📎 ZAŁĄCZONE ZDJĘCIA (${uploadedPhotoUrls.length}):\n`;
        uploadedPhotoUrls.forEach((url, index) => {
          attachmentsInfo += `${index + 1}. ${url}\n`;
        });
        
        // HTML z linkami do zdjęć
        photosHtml = '<br><br><div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #8B7355;">';
        photosHtml += `<strong style="color: #8B7355;">📎 Załączone zdjęcia (${uploadedPhotoUrls.length}):</strong><br><br>`;
        uploadedPhotoUrls.forEach((url, index) => {
          photosHtml += `<div style="margin-bottom: 15px;">`;
          photosHtml += `<a href="${url}" target="_blank" style="display: inline-block; margin-bottom: 5px; color: #8B7355; text-decoration: none; font-weight: bold;">Zdjęcie ${index + 1} - Kliknij aby zobaczyć</a><br>`;
          photosHtml += `<img src="${url}" alt="Zdjęcie ${index + 1}" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 8px; margin-top: 5px;">`;
          photosHtml += `</div>`;
        });
        photosHtml += '</div>';
      }
      
      const templateParams: any = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message + attachmentsInfo,
        to_email: 'dokwadratu.w@gmail.com'
      };
      
      // Dodaj HTML ze zdjęciami jeśli są
      if (photosHtml) {
        templateParams.photos_html = photosHtml;
      }
      
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
          errorMsg += 'Prawdopodobnie dane są zbyt duże. Spróbuj ponownie.';
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

