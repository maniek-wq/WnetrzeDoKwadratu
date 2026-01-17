# ⚠️ Rozwiązanie błędu 401 Cloudinary

## Problem:
Błąd **401 (Unauthorized)** oznacza, że Cloudinary odrzuca upload, ponieważ preset nie jest poprawnie skonfigurowany.

---

## ✅ Rozwiązanie krok po kroku:

### 1. Sprawdź czy preset istnieje i jest "Unsigned"

1. Wejdź do **Cloudinary Dashboard**
2. **Settings** (⚙️) → **Upload** → **Upload presets**
3. Znajdź preset `wnetrze_upload`
4. **Sprawdź kolumnę "Mode":**
   - ✅ Musi być **"Unsigned"** (czerwony tag)
   - ❌ Jeśli jest **"Signed"** - to jest problem!

### 2. Jeśli preset jest "Signed" - zmień na "Unsigned":

1. Kliknij na preset `wnetrze_upload` (lub ikonę z 3 kropkami → Edit)
2. Znajdź **"Signing mode"**
3. Zmień z **"Signed"** na **"Unsigned"**
4. **Zapisz** zmiany

### 3. Sprawdź dokładną nazwę presetu:

W Cloudinary Dashboard:
- Kolumna **"Name"** - dokładna nazwa presetu
- **Musi być identyczna** jak w kodzie: `wnetrze_upload`

Jeśli nazwa jest inna (np. `wnetrze-upload` z myślnikiem):
- Albo zmień nazwę presetu w Cloudinary na `wnetrze_upload`
- Albo zmień w kodzie na dokładną nazwę z Cloudinary

### 4. Sprawdź Cloud Name:

W kodzie masz: `CLOUD_NAME: 'dcdbqkdu6'`

Sprawdź w Cloudinary:
- **Settings** → **Product environment credentials**
- Porównaj Cloud Name - musi być identyczny!

---

## 🔍 Debug - sprawdź w konsoli:

Po poprawieniu, otwórz konsolę przeglądarki (F12 → Console) i sprawdź:
- Jeśli nadal 401 - preset nie jest Unsigned lub nazwa jest nieprawidłowa
- Jeśli inny błąd - będzie widoczny dokładny komunikat

---

## ✅ Po poprawieniu:

1. **Zapisz preset** w Cloudinary jako "Unsigned"
2. **Odśwież stronę** (F5)
3. **Wyślij formularz** ponownie ze zdjęciem
4. Powinno działać! ✅

---

## 🆘 Jeśli nadal nie działa:

**Alternatywne rozwiązanie - utwórz nowy preset:**

1. **Settings** → **Upload** → **Upload presets**
2. **"+ Add Upload Preset"**
3. **Preset name:** `wnetrze_upload_v2`
4. **Signing mode:** Wybierz **"Unsigned"** ⚠️
5. **Zapisz**
6. W kodzie zmień na: `UPLOAD_PRESET: 'wnetrze_upload_v2'`

---

**Większość problemów z 401 to preset nie ustawiony jako "Unsigned"!** 🔑

