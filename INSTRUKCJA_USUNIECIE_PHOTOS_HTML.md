# 📧 Instrukcja: Usunięcie {{photos_html}} z szablonu EmailJS

## ⚠️ Problem:
EmailJS **nie obsługuje załączników** ani inline images z base64. Zmienna `{{photos_html}}` nie działa poprawnie i wyświetla się jako nieklikalny tekst.

## ✅ Rozwiązanie:
Informacja o zdjęciach jest teraz **tylko w głównej wiadomości** `{{message}}`. Musisz **usunąć** `{{photos_html}}` z szablonu EmailJS.

---

## 🔧 Krok 1: Wejdź do EmailJS Dashboard

1. Zaloguj się na [emailjs.com](https://www.emailjs.com)
2. Przejdź do **Email Templates**
3. Znajdź szablon `template_3arq60s`
4. Kliknij **Edit** → zakładka **Content**

---

## 🔧 Krok 2: Usuń {{photos_html}}

W treści szablonu **usuń linię** z `{{photos_html}}`:

### ❌ PRZED (usunąć):
```
Wiadomość:
{{message}}
{{photos_html}}

---
Wiadomość wysłana automatycznie...
```

### ✅ PO (poprawne):
```
Wiadomość:
{{message}}

---
Wiadomość wysłana automatycznie...
```

---

## 📋 Pełny poprawny szablon:

```
Witaj!

Otrzymałeś nową wiadomość z formularza kontaktowego na stronie Wnętrze do kwadratu.

---
Od: {{from_name}}
Email: {{from_email}}
Temat: {{subject}}
---
Wiadomość:
{{message}}

---
Wiadomość wysłana automatycznie przez formularz kontaktowy.
```

---

## ✅ Jak to działa teraz:

1. Użytkownik wypełnia formularz i dodaje zdjęcia
2. Informacja o zdjęciach jest **automatycznie dodawana** do `{{message}}`
3. W emailu widzisz:
   ```
   Opisz swój projekt...
   
   📎 ZAŁĄCZONE ZDJĘCIA (2):
   1. IMG_5258.PNG (60.1 KB)
   2. project.jpg (120.5 KB)
   
   (Uwaga: Zdjęcia zostały przesłane przez formularz. 
   Skontaktuj się z klientem bezpośrednio, aby je otrzymać.)
   ```

---

## 💡 Jeśli chcesz zdjęcia w emailu:

EmailJS tego **nie obsługuje**. Możliwe rozwiązania:

1. **Cloudinary** (upload zdjęć → linki w emailu) - wymaga dodatkowej konfiguracji
2. **Firebase Storage** - podobnie
3. **Własny backend** - pełna kontrola, ale bardziej skomplikowane

**Na razie:** Najlepiej skontaktować się z klientem bezpośrednio po otrzymaniu emaila i poprosić o zdjęcia przez WhatsApp/Email.

---

**Po usunięciu `{{photos_html}}` zapisz szablon i gotowe!** ✨


