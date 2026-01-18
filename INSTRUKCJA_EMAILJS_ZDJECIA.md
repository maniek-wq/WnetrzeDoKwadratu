# 📧 Instrukcja: Konfiguracja EmailJS dla zdjęć

## ✅ Co zostało zaimplementowane:

Formularz kontaktowy obsługuje teraz:
- ✅ Upload **maksymalnie 5 zdjęć**
- ✅ Każde zdjęcie do **10MB**
- ✅ Podgląd zdjęć przed wysłaniem
- ✅ Możliwość usunięcia zdjęć przed wysłaniem
- ✅ Zdjęcia są wysyłane jako **miniaturki w HTML emailu**

---

## 🔧 Konfiguracja szablonu EmailJS:

### Krok 1: Wejdź do EmailJS Dashboard
1. Zaloguj się na [emailjs.com](https://www.emailjs.com)
2. Przejdź do **Email Templates**
3. Znajdź szablon `template_3arq60s` (lub Twój template ID)
4. Kliknij **Edit**

### Krok 2: Dodaj zmienne do szablonu

W treści szablonu znajdź sekcję z wiadomością i **dodaj na końcu**:

```html
{{message}}

{{photos_html}}
```

**Pełny przykład szablonu:**

```
Od: {{from_name}} ({{from_email}})

Temat: {{subject}}

Wiadomość:
{{message}}

{{photos_html}}

---
Wiadomość wysłana z formularza kontaktowego wnetrzedokwadratu.pl
```

### Krok 3: Ustaw format emaila na HTML

W ustawieniach szablonu:
- Format: **HTML**
- To uaktywni renderowanie HTML ze zdjęciami

### Krok 4: Zapisz szablon

Kliknij **Save** i gotowe!

---

## 📋 Jak to działa:

1. Użytkownik wybiera zdjęcia w formularzu
2. Zdjęcia są konwertowane na **base64** (miniaturki)
3. W emailu pojawiają się jako **inline images** w HTML
4. Rozmiar emaila może być większy, ale Gmail/Outlook obsługują to poprawnie

---

## ⚠️ Ograniczenia:

- **EmailJS ma limit 25MB** na całą wiadomość
- Dla większych zdjęć: użyj Cloudinary (zobacz alternatywa poniżej)

---

## 🚀 Alternatywa (zaawansowana): Cloudinary

Jeśli potrzebujesz większych plików lub lepszej jakości:

1. Załóż konto na [cloudinary.com](https://cloudinary.com) (darmowe 25GB)
2. Zamiast base64, upload zdjęć na Cloudinary
3. Wyślij **linki** do zdjęć w emailu

**To wymaga dodatkowej implementacji backendu lub Cloudinary Upload Widget.**

---

## ✨ Testowanie:

1. Prześlij formularz ze zdjęciami
2. Sprawdź email - powinny być widoczne miniaturki
3. Kliknij w miniaturkę - otworzy się pełny rozmiar

---

**Potrzebujesz pomocy?** Skontaktuj się ze mną!


