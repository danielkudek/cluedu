// api/config.js
// Centralna konfiguracja aplikacji Cluedu
// Wszystkie stałe w jednym miejscu — edytuj tutaj, nie w index.html

module.exports = {

  // ─── MODEL AI ────────────────────────────────────────────────────────────────
  MODEL:       'claude-haiku-4-5-20251001',
  MAX_TOKENS:  400,

  // ─── KREDYTY ─────────────────────────────────────────────────────────────────
  CREDITS_TOTAL:  2500,   // kredyty na miesiąc na użytkownika
  CREDITS_MSG:    2,      // koszt jednej wiadomości
  CREDITS_PHOTO:  4,      // koszt wysłania zdjęcia

  // ─── MODERACJA ───────────────────────────────────────────────────────────────
  MAX_OFFTOPIC:     5,              // ile razy offtopic przed blokadą
  MAX_VULGAR:       3,              // ile wulgaryzmów dziennie przed blokadą
  BLOCK_DURATION:   5 * 60 * 1000, // czas blokady w ms (5 minut)

  // ─── LIMITY ──────────────────────────────────────────────────────────────────
  MAX_PENDING:    3,    // maks. niedokończonych zadań
  HISTORY_LIMIT:  8,    // ile ostatnich wiadomości wysyłamy do API
  MAX_MSG_LENGTH: 500,  // maks. długość wiadomości ucznia (znaki)
  MAX_OCR_DAILY:  3,    // maks. zdjęć OCR dziennie

  // ─── AUTORYZACJA ─────────────────────────────────────────────────────────────
  DEFAULT_CODE: 'cluedu2026',  // domyślny kod dostępu

};
