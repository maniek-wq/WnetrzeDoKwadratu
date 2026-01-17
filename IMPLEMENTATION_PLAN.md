# Plan Implementacji Strony Wizytówki - Wnętrze do kwadratu

## 1. Setup Projektu

### 1.1 Inicjalizacja Angular (17+)
- Utworzenie struktury projektu Angular (standalone components)
- Konfiguracja `package.json` z wymaganymi zależnościami
- Setup `angular.json` dla konfiguracji buildów
- TypeScript configuration

### 1.2 Instalacja Tailwind CSS
- Instalacja Tailwind CSS i jego konfiguracja
- Utworzenie `tailwind.config.js` z kolorami:
  - Jasny beż (`#F5F5DC`, `#F5E6D3`)
  - Kolory ziemi (`#8B7355`, `#D4A574`, `#B8860B`)
  - Biel (`#FFFFFF`)
  - Szarość (`#808080`, `#A9A9A9`, `#2F2F2F`)

### 1.3 Struktura Katalogów
```
WDK/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── hero-section/
│   │   │   └── contact-button/
│   │   ├── services/
│   │   ├── animations/
│   │   ├── styles/
│   │   └── app.js
│   ├── assets/
│   │   └── images/
│   │       └── bg.png
│   └── index.html
├── package.json
├── angular.json
└── tailwind.config.js
```

## 2. Główna Sekcja Hero z Animacjami

### 2.1 Komponent Hero Section (`hero-section/`)
**Funkcjonalność:**
- Pełnoekranowy background z obrazem `bg.png`
- Animacja zoom-out po ~1s (efekt "cofnięcia" tła)
- Sekwencja animacji:
  1. **0-1s**: Obraz w pełnym zbliżeniu (scale: 1.2-1.5)
  2. **1s**: Start animacji zoom-out
  3. **1-2s**: Background animuje się do scale: 1.0
  4. **2s**: Pojawienie się navbara (fade-in + slide-down)
  5. **2-3.5s**: Animacja tekstu "Wnętrze do kwadratu" - literka po literce

### 2.2 Implementacja Animacji Background
**CSS/Tailwind:**
```css
- Initial state: scale(1.3), opacity(0.9)
- Animation: scale transition from 1.3 to 1.0 over 1s
- Easing: cubic-bezier(0.4, 0, 0.2, 1) - smooth easing
```

### 2.3 Animacja Tekstu Literka po Literce
**Implementacja:**
- Każda literka w osobnym `<span>`
- CSS animation z `@keyframes` dla fade-in każdej litery
- Opóźnienia (`animation-delay`) dla kolejnych liter
- Czas trwania: ~1.5s dla całego tekstu

## 3. Navbar Component

### 3.1 Struktura Navbara
```
┌─────────────────────────────────────────────────────────┐
│ [Logo]    [Projekty | Usługi | O nas | Kontakt]    [📧] │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Elementy Navbara
- **Lewa strona**: Logo (SVG lub PNG)
- **Środek**: Zakładki nawigacyjne z separacją "|"
- **Prawa strona**: Button z ikoną formularza kontaktowego

### 3.3 Animacja Pojawienia się
- **Trigger**: Po zakończeniu animacji zoom-out
- **Animacja**: Fade-in (opacity 0 → 1) + slide-down (translateY(-20px) → 0)
- **Czas**: 0.5s ease-out

### 3.4 Styling Navbara
- Tło: półprzezroczyste (rgba z kolorami beżowymi/ziemnymi)
- Backdrop blur dla efektu glassmorphism
- Fixed position po pojawieniu się
- Responsive design dla mobile

## 4. Integracja z Angular

### 4.1 Komponenty Angular (Standalone)
1. **App Component** - główny kontener (standalone)
2. **HeroSection Component** - sekcja z backgroundem i animacjami (standalone)
3. **Navbar Component** - nawigacja górna (standalone)

### 4.2 Serwisy
- **AnimationService** - zarządzanie sekwencją animacji
- **ScrollService** - obsługa scroll events (dla przyszłych sekcji)

### 4.3 Directives (jeśli potrzebne)
- Custom directive dla animacji liter po kolei

## 5. Timeline Implementacji

### Faza 1: Setup i Podstawowa Struktura
1. ✅ Utworzenie struktury projektu
2. ✅ Konfiguracja Angular.js
3. ✅ Instalacja i konfiguracja Tailwind CSS
4. ✅ Setup podstawowych komponentów

### Faza 2: Hero Section z Backgroundem
1. ✅ Umieszczenie obrazu `bg.png` jako background
2. ✅ Implementacja pełnoekranowej sekcji hero
3. ✅ Animacja zoom-out backgroundu
4. ✅ Synchronizacja timing'u (1s delay)

### Faza 3: Navbar
1. ✅ Tworzenie komponentu navbar
2. ✅ Layout (logo | zakładki | button)
3. ✅ Animacja pojawienia się
4. ✅ Styling z kolorami projektu

### Faza 4: Animacja Tekstu
1. ✅ Utworzenie tekstu "Wnętrze do kwadratu"
2. ✅ Implementacja animacji literka po literce
3. ✅ Synchronizacja z animacją navbaru
4. ✅ Fine-tuning timing'u

### Faza 5: Integracja i Testy
1. ✅ Połączenie wszystkich elementów
2. ✅ Testy responsywności
3. ✅ Optymalizacja performance
4. ✅ Testy cross-browser

## 6. Szczegóły Techniczne

### 6.1 Kolory Palette (Tailwind Config)
```javascript
colors: {
  beige: {
    light: '#F5F5DC',
    medium: '#F5E6D3',
    warm: '#E8DCC6'
  },
  earth: {
    brown: '#8B7355',
    tan: '#D4A574',
    gold: '#B8860B'
  },
  gray: {
    light: '#A9A9A9',
    medium: '#808080',
    dark: '#2F2F2F'
  }
}
```

### 6.2 Animation Timing
- Background zoom-out: 1s delay, 1s duration
- Navbar appear: 2s delay (po zoom-out), 0.5s duration
- Text animation: 2s delay, ~1.5s duration (literka po literce)

### 6.3 Performance Considerations
- Lazy loading obrazu
- CSS animations zamiast JS (gdzie możliwe)
- `will-change` dla animowanych elementów
- Optimized images (WebP fallback)

## 7. Następne Kroki (Future Content)
Po zaimplementowaniu hero section, użytkownik będzie mógł:
- Scrollować w dół aby odkrywać kolejne sekcje
- Smooth scroll transitions
- Lazy load content dla kolejnych sekcji
- Sticky navbar podczas scrollowania

---

## Rozpoczęcie Implementacji

Czy chcesz, żebym rozpoczął implementację zgodnie z tym planem? Mogę:
1. Utworzyć strukturę projektu Angular.js
2. Skonfigurować Tailwind CSS
3. Zaimplementować komponenty zgodnie z planem

Powiedz "tak" jeśli mam rozpocząć, lub wprowadź poprawki do planu.

