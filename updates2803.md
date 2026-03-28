# updates2803.md
# Changelog i plany rozwoju Cluedu — sesja 28.03.2026
#
# INSTRUKCJA DLA CLAUDE:
# Gdy użytkownik prosi o nowy plik updates[ddmm].md do aktualizacji w Project Knowledge,
# przeanalizuj wszystkie zmiany z bieżącej sesji i:
# 1. Utwórz nowy plik z aktualną datą w nazwie (format: updates[ddmm].md)
# 2. Zaktualizuj go o nowy wpis w changelogu
# 3. Oceń czy zmiany wpływają na architekturę, strukturę plików lub kluczowe zasady
# 4. Jeśli tak — wskaż konkretne sekcje CLAUDE.md do aktualizacji
# 5. Jeśli nie — napisz "CLAUDE.md aktualny, nie wymaga zmian"
# 6. Na końcu pliku zawsze dodaj sekcję "Następna sesja — zacznij od:"
#    z konkretnymi krokami do wykonania jako pierwsze w kolejnej sesji

---

## ⚠️ PRZED WDROŻENIEM NA WIĘKSZĄ SKALĘ — WYMAGANE
# To przypomnienie pojawia się w każdej wersji updates[ddmm].md
- [ ] Wprowadzić bazę danych klientów (obecnie brak — dane w localStorage)
- [ ] Zmienić strukturę przechowywania kodu dostępu i PINu (obecnie localStorage — niebezpieczne)
- [ ] Zbudować `api/auth.js` z prawdziwą autoryzacją per użytkownik
- [ ] Przenieść `ACCESS_CODE` i `PARENT_PIN` do zmiennych środowiskowych Vercel

---

## v0.10 — aktualna wersja
*Sesja 28.03.2026: refaktoring architektury + optymalizacje finansowe*

### Zmiany architektoniczne
- Prompty przeniesione do `api/prompts.js` — budowane po stronie serwera
- Konfiguracja przeniesiona do `api/config.js`
- Przedmioty przeniesione do `api/subjects.js` + endpoint GET `/api/subjects`
- Moderacja przeniesiona do `api/moderation.js` + endpoint GET `/api/moderation`
- `index.html` nie zawiera już logiki biznesowej ani stałych konfiguracyjnych
- Przedmioty i flagi pobierane przez `fetch` przy starcie aplikacji
- `S.subjects` przechowuje dane przedmiotów pobrane z API

### Nowe funkcje
- System kredytów: 2500/miesiąc, wiadomość=2, zdjęcie=4
- Kółko kredytów (SVG) na ekranie głównym — wizualny wskaźnik zużycia
- Etykiety `2 🔋` / `4 🔋` przy przyciskach czatu
- Dokładny licznik kredytów w panelu rodzica
- Reset kredytów automatycznie pierwszego dnia miesiąca
- Limit długości wiadomości: 500 znaków
- Limit OCR: 3 zdjęcia dziennie
- Opcja A dla OCR: po [DONE] wyświetla pozostałe zadania ze zdjęcia w chacie
- Flaga [DONE] dodana do wszystkich promptów

### Poprawki
- Panel rodzica: przedmioty z `S.subjects` zamiast usuniętej stałej `SUBJECTS`
- `HISTORY_LIMIT` obniżony do 8 (było 12)
- `MAX_TOKENS` obniżony do 400 (było 600)
- Zmiana poziomu w panelu rodzica: wybór 1/2/3 zamiast angielskich słów

---

## v0.9
*Sesja: naprawa bugów + REDAGUJ mode*

### Poprawki
- `trimmedMessages()` czyści wiadomości ze zbędnych pól przed wysłaniem do API
- Naprawia zawieszanie przy drugim zapytaniu w chacie

### Nowe funkcje
- REDAGUJ mode: baner inline zamiast overlaya
- Blokada mikrofonu z licznikiem 2 wolnych interakcji (`redagujSkip`)

---

## Znane problemy techniczne do rozwiązania

- [ ] Stałe zdublowane — istnieją w `api/config.js` i w `index.html` jednocześnie.
      Docelowo `index.html` powinien pobierać wartości z `/api/config` tak jak pobiera
      przedmioty i flagi. Ryzyko: zmiana w jednym miejscu bez zmiany w drugim.

---

## Zaplanowane — według priorytetu

### Priorytet wysoki
- [ ] Dokończenie przeglądania i zatwierdzania promptów per przedmiot
      (zostały: ang, bio, his, che, fiz, geo, prz, unknown)
- [ ] Endpoint `/api/config` — `index.html` pobiera stałe z serwera,
      usunięcie duplikatów stałych z frontendu
- [ ] `api/auth.js` — przeniesienie kodu dostępu i PINu do zmiennych środowiskowych Vercel

### Priorytet średni
- [ ] UI kredytów: ekran "brak kredytów" z opcją dokupienia
- [ ] Statystyki kredytów w raporcie rodzica (wykres zużycia)
- [ ] Dzienny limit zapytań jako dodatkowy bezpiecznik

### Priorytet niski
- [ ] Lifting panelu rodzica — modal zamiast `prompt()` przy zmianie imienia/poziomu
- [ ] Animacja kółka kredytów przy starcie aplikacji
- [ ] Licznik znaków przy polu tekstowym czatu (500 limit)

---

## Następna sesja — zacznij od:

1. Przejrzeć i zatwierdzić prompt dla **angielskiego** (następny w kolejce po mat i pol)
2. Kontynuować przegląd pozostałych promptów: bio, his, che, fiz, geo, prz, unknown
3. Po zatwierdzeniu wszystkich promptów — zaplanować endpoint `/api/config`
   który usunie duplikaty stałych z `index.html`
