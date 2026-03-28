# CLAUDE.md
# Opis projektu Cluedu — dokument stały
# Aktualizuj tylko gdy zmienia się architektura, struktura plików lub kluczowe zasady

## Aktualny changelog
# Pliki updates mają format: updates[ddmm].md (np. updates2803.md)
# Przy każdej sesji: znajdź plik updates[ddmm].md z najpóźniejszą datą
# spośród wszystkich plików w Project Knowledge — to jest aktualny changelog.

## Co to jest Cluedu
AI Korepetytor dla polskich dzieci. Aplikacja webowa działająca w przeglądarce.
Uczeń wybiera przedmiot, wpisuje (lub fotografuje / nagrywa) zadanie, a AI prowadzi
go do rozwiązania metodą sokratejską — naprowadza, nie podaje gotowych odpowiedzi.

## Technologia
- Frontend: `index.html` — single-file SPA, vanilla JS + CSS, zero zewnętrznych zależności
- Backend: Vercel Serverless Functions (`api/*.js`)
- AI: Anthropic Claude Haiku 4.5 z prompt cachingiem
- Deploy: Vercel (push do main = auto-deploy)
- Dane: localStorage (brak bazy danych)

## Struktura plików
```
api/
  claude.js       ← handler HTTP, wywołuje Anthropic API
  prompts.js      ← system prompty per przedmiot, budowane po stronie serwera
  config.js       ← wszystkie stałe aplikacji (limity, kredyty, model AI)
  subjects.js     ← lista przedmiotów per poziom + endpoint GET /api/subjects
  moderation.js   ← flagi moderacji + endpoint GET /api/moderation
  auth.js         ← (planowany) autoryzacja — odkładamy do fazy skalowania

index.html        ← cały frontend: UI, CSS, logika klienta
CLAUDE.md         ← ten plik — stały opis projektu
updates[ddmm].md  ← changelog i plany — szukaj pliku z najpóźniejszą datą
```

## Architektura — kluczowe zasady
- Logika biznesowa, prompty, konfiguracja → TYLKO na serwerze (`api/`)
- `index.html` zawiera wyłącznie UI i obsługę zdarzeń
- Żadnych haseł, progów moderacji ani flag w przeglądarce
- Stałe konfiguracyjne edytuj w `api/config.js`, nie w `index.html`
- Przedmioty i flagi moderacji pobierane przez fetch z `/api/subjects` i `/api/moderation`

## Ekrany aplikacji (CSS class toggle, brak routera)
1. `#screen-access` — kod dostępu
2. `#screen-onboarding` — imię + poziom nauczania
3. `#screen-main` — wybór przedmiotu + niedokończone zadania
4. `#screen-task` — wprowadzanie zadania (tekst / zdjęcie / głos)
5. `#screen-chat` — rozmowa z AI
6. `#screen-report` — panel rodzica (PIN-chroniony)

## System promptów
- Każdy przedmiot ma osobny prompt w `api/prompts.js`
- Wspólny rdzeń (`core()`) zawiera: imię ucznia, poziom, styl, zasady moderacji
- Prompt budowany po stronie serwera — niewidoczny w przeglądarce
- Przedmioty: mat, pol, ang, bio, his, che, fiz, geo, prz, unknown
- Poziomy: primary (kl. 1–3), middle (kl. 4–8), high (liceum)

## Flagi moderacji (zwracane przez AI w odpowiedzi)
- `[OFFTOPIC]` — odpowiedź niezwiązana z zadaniem
- `[VULGAR1/2/3]` — wulgaryzmy (przy 3 w ciągu dnia → blokada 5 min)
- `[REDAGUJ]` — tryb pisania wypracowań (blokuje mikrofon)
- `[DONE]` — zadanie zakończone poprawnie

## System kredytów
- 2500 kredytów miesięcznie, reset 1. dnia miesiąca
- Wiadomość = 2 kredyty, zdjęcie = 4 kredyty
- Koniec kredytów = brak dostępu do końca miesiąca
- Kredyty przechowywane w localStorage (`ccredits`, `ccredits_month`)

## Limity
- Historia czatu wysyłana do API: 8 wiadomości (`HISTORY_LIMIT`)
- Max długość wiadomości ucznia: 500 znaków
- Max zdjęć OCR dziennie: 3
- Max niedokończonych zadań: 3 (`MAX_PENDING`)
- Max tokenów odpowiedzi AI: 400 (`MAX_TOKENS`)

## Autoryzacja (obecna — uproszczona)
- Kod dostępu: przechowywany w localStorage, domyślnie `cluedu2026`
- PIN rodzica: 4 cyfry, przechowywany w localStorage
- Planowana zmiana: przeniesienie do zmiennych środowiskowych Vercel (`ACCESS_CODE`, `PARENT_PIN`)

## Zmienne środowiskowe Vercel
- `ANTHROPIC_API_KEY` — klucz API Anthropic (wymagany)

## Rozwój lokalny
```bash
npm install -g vercel
vercel dev
```

## Język
Cały UI, prompty i odpowiedzi AI — po polsku.
