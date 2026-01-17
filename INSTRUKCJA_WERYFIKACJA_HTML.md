# 📄 Instrukcja: Weryfikacja Google Search Console przez plik HTML

## ✅ To jest NAJŁATWIEJSZA metoda!

Zamiast DNS TXT (które może sprawiać problemy), możesz zweryfikować domenę przez plik HTML.

---

## 🔧 Krok po kroku:

### 1. Pobierz plik z Google Search Console

1. W Google Search Console kliknij **"Pobierz plik"**
2. Pobierze się plik: `google3d8527a5788f05dc.html`

### 2. Wrzuć plik do projektu

**Skopiuj plik do:**
```
src/google3d8527a5788f05dc.html
```

### 3. Sprawdź czy plik jest w angular.json

Plik **automatycznie** będzie skopiowany przy buildzie, jeśli jest w folderze `src/`.

Jeśli nie działa, sprawdź `angular.json` - w sekcji `assets` powinno być:
```json
"assets": [
  "src/...",
  "src/google3d8527a5788f05dc.html"
]
```

### 4. Deploy na Vercel

1. Push do Git:
   ```bash
   git add src/google3d8527a5788f05dc.html
   git commit -m "add: Google verification file"
   git push
   ```

2. Vercel automatycznie zbuduje i zdeployuje

3. Poczekaj 2-3 minuty na deploy

### 5. Zweryfikuj w Google Search Console

1. Wejdź do Google Search Console
2. Kliknij **"WERYFIKUJ"**
3. Google sprawdzi czy plik jest dostępny pod:
   `https://wnetrzedokwadratu.pl/google3d8527a5788f05dc.html`
4. Powinno działać! ✅

---

## ✅ Test lokalny (opcjonalnie):

Możesz sprawdzić czy plik będzie dostępny:

1. Zbuduj projekt: `npm run build`
2. Sprawdź w `dist/wnetrze-do-kwadratu/browser/` - powinien być plik HTML
3. Albo po deploy sprawdź: `https://wnetrzedokwadratu.pl/google3d8527a5788f05dc.html`

---

## ⚠️ WAŻNE:

- **NIE USUWAJ** pliku po weryfikacji!
- Plik musi pozostać na stronie na zawsze
- To zapewnia ciągłą weryfikację

---

## 🆚 Weryfikacja HTML vs DNS:

| Metoda | Zalety | Wady |
|--------|--------|------|
| **HTML** | ✅ Łatwe, działa od razu | ⚠️ Plik musi być na serwerze |
| **DNS TXT** | ✅ Raz dodane, działa zawsze | ⚠️ Może wymagać czasu na propagację |

**Rekomendacja:** **HTML jest prostsze!** 🎯

---

**Po wrzuceniu pliku i deploy - weryfikacja powinna działać natychmiast!** 🚀

