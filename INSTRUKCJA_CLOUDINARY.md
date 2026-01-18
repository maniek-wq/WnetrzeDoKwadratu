# ☁️ Instrukcja: Konfiguracja Cloudinary dla zdjęć w formularzu

## ✅ Co zostało zaimplementowane:

- ✅ Upload zdjęć do Cloudinary (chmura)
- ✅ Automatyczne generowanie linków do zdjęć
- ✅ Wysyłanie linków w emailu przez EmailJS
- ✅ Miniaturki zdjęć widoczne bezpośrednio w emailu

---

## 🔧 Krok 1: Załóż konto Cloudinary

1. Wejdź na [cloudinary.com](https://cloudinary.com)
2. Kliknij **"Sign Up for Free"**
3. Załóż darmowe konto (25GB storage, 25GB bandwidth/miesiąc)
4. Potwierdź email

---

## 🔧 Krok 2: Skonfiguruj Upload Preset

1. Po zalogowaniu → **Dashboard**
2. Przejdź do **Settings** (⚙️ w górnym menu)
3. Kliknij **Upload** w lewym menu
4. Przewiń do sekcji **"Upload presets"**
5. Kliknij **"Add upload preset"**
6. Ustawienia:
   - **Preset name:** `wnetrze_upload` (lub dowolna nazwa)
   - **Signing mode:** Wybierz **"Unsigned"** ⚠️ (ważne!)
   - **Folder:** `wnetrze-do-kwadratu/contact-form` (opcjonalnie)
   - **Format:** `Auto` (automatyczna optymalizacja)
   - **Quality:** `Auto:good` (dobra jakość, mały rozmiar)
7. Kliknij **"Save"**

---

## 🔧 Krok 3: Skopiuj Cloud Name

1. W Dashboard → **Settings** → **Product environment credentials**
2. Skopiuj **Cloud name** (np. `dokwadratu`)

---

## 🔧 Krok 4: Zaktualizuj kod

Otwórz plik: `src/app/components/contact-section/contact-section.component.ts`

Znajdź sekcję:
```typescript
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'YOUR_CLOUD_NAME',        // ← Wpisz tutaj
  UPLOAD_PRESET: 'YOUR_UPLOAD_PRESET'   // ← Wpisz tutaj
};
```

Wpisz swoje dane:
```typescript
const CLOUDINARY_CONFIG = {
  CLOUD_NAME: 'dokwadratu',              // Twój Cloud Name
  UPLOAD_PRESET: 'wnetrze_upload'         // Nazwa presetu z kroku 2
};
```

---

## 🔧 Krok 5: Zaktualizuj szablon EmailJS

1. Wejdź do EmailJS → **Email Templates**
2. Edytuj szablon `template_3arq60s`
3. W treści emaila **dodaj** `{{photos_html}}`:

```
Wiadomość:
{{message}}

{{photos_html}}

---
Wiadomość wysłana automatycznie...
```

4. **Zapisz** szablon

---

## ✅ Jak to działa:

1. Użytkownik wybiera zdjęcia w formularzu
2. Po kliknięciu "Wyślij" → zdjęcia są **automatycznie uploadowane** do Cloudinary
3. Cloudinary zwraca **publiczne linki** do zdjęć
4. Linki są wysyłane w emailu przez EmailJS
5. W emailu widzisz **miniaturki zdjęć** + linki do pełnych rozmiarów

---

## 📧 Przykład emaila:

```
Wiadomość:
Opisz swój projekt...

📎 ZAŁĄCZONE ZDJĘCIA (2):
1. https://res.cloudinary.com/.../image1.jpg
2. https://res.cloudinary.com/.../image2.jpg

[W HTML emailu: miniaturki zdjęć z linkami]
```

---

## 💰 Koszty Cloudinary:

- **Darmowy plan:** 25GB storage + 25GB bandwidth/miesiąc
- **Dla małej firmy:** Wystarczy na ~1000 zdjęć/miesiąc
- **Jeśli przekroczysz:** $0.02/GB storage, $0.04/GB bandwidth

---

## ⚠️ Ważne:

- **Unsigned preset** jest bezpieczny dla frontendu (nie wymaga kluczy API)
- Zdjęcia są **publiczne** (dostępne przez link)
- Możesz ustawić **automatyczne usuwanie** starych zdjęć w ustawieniach Cloudinary

---

## 🚀 Testowanie:

1. Wypełnij formularz kontaktowy
2. Dodaj zdjęcie
3. Wyślij
4. Sprawdź email - powinny być widoczne miniaturki!

---

**Gotowe!** Po konfiguracji wszystko będzie działać automatycznie. 🎉


