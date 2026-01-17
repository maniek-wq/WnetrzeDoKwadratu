# Wnętrze do kwadratu - Strona Wizytówka

Strona wizytówka dla biura projektantów wnętrz z nowoczesnymi animacjami.

## Technologie

- **Angular 17** - Framework frontendowy
- **Tailwind CSS** - Styling
- **TypeScript** - Język programowania

## Funkcjonalności

- ✅ Pełnoekranowy hero section z animacją zoom-out backgroundu
- ✅ Navbar z efektem glassmorphism pojawiający się po animacji
- ✅ Animacja tekstu "Wnętrze do kwadratu" literka po literce
- ✅ Responsywny design
- ✅ Paleta kolorów: beże, kolory ziemi, szarości

## Instalacja

```bash
npm install
```

## Uruchomienie

```bash
npm start
```

Aplikacja będzie dostępna pod adresem `http://localhost:4200`

## Build produkcyjny

```bash
npm run build
```

## Struktura projektu

```
src/
├── app/
│   ├── components/
│   │   ├── hero-section/    # Sekcja hero z animacjami
│   │   └── navbar/          # Nawigacja górna
│   └── app.component.ts     # Główny komponent
├── assets/
│   └── images/
│       └── bg.png           # Obraz tła
└── styles.css               # Globalne style z Tailwind
```

## Animacje

1. **Background zoom-out**: Animacja scale z 1.3 do 1.0 (1s delay, 1s duration)
2. **Navbar fade-in**: Pojawienie się navbara (2s delay, 0.5s duration)
3. **Text animation**: Literka po literce (2s delay, ~1.5s duration)

## Kolory

- **Beże**: #F5F5DC (light), #F5E6D3 (medium), #E8DCC6 (warm)
- **Ziemie**: #8B7355 (brown), #D4A574 (tan), #B8860B (gold)
- **Szarości**: #A9A9A9 (light), #808080 (medium), #2F2F2F (dark)


