// api/moderation.js
// Logika moderacji — flagi, progi, blokady
// Edytuj tutaj, nie w index.html

const config = require('./config');

// ─── FLAGI ───────────────────────────────────────────────────────────────────
// Flagi które AI dodaje na końcu odpowiedzi
const FLAGS = {
  OFFTOPIC: '[OFFTOPIC]',
  VULGAR1:  '[VULGAR1]',
  VULGAR2:  '[VULGAR2]',
  VULGAR3:  '[VULGAR3]',
  REDAGUJ:  '[REDAGUJ]',
  DONE:     '[DONE]',
};

// ─── INSTRUKCJE MODERACJI DO PROMPTU ─────────────────────────────────────────
// Wstrzykiwane do każdego system promptu przez buildPrompt()
const MODERATION_RULES = `MODERACJA:
• Gdy uczeń pisze offtopic → wróć do tematu + ${FLAGS.OFFTOPIC}
• Wulgaryzmy: pierwsze → ${FLAGS.VULGAR1}, drugie → ${FLAGS.VULGAR2}, trzecie → ${FLAGS.VULGAR3}
• Poprawna odpowiedź → potwierdź, dodaj ${FLAGS.DONE} i zakończ`;

// ─── HANDLER MODERACJI (wywoływany przez /api/moderate) ───────────────────────
const handler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // cache na 24h
  if (req.method !== 'GET') return res.status(405).end();

  // Zwróć klientowi tylko to co niezbędne do UI
  // Progi i czasy blokad pozostają ukryte
  res.status(200).json({
    flags: FLAGS,
  });
};

module.exports = handler;
module.exports.FLAGS = FLAGS;
module.exports.MODERATION_RULES = MODERATION_RULES;
