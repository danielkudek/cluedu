// api/subjects.js
// Lista przedmiotów per poziom nauczania
// Edytuj tutaj, nie w index.html

const SUBJECTS = {

  primary: [
    { id: 'mat', name: 'Matematyka', emoji: '🔢', ac: 'ac-mat' },
    { id: 'pol', name: 'Polski',     emoji: '📖', ac: 'ac-pol' },
    { id: 'ang', name: 'Angielski',  emoji: '🌍', ac: 'ac-ang' },
    { id: 'prz', name: 'Przyroda',   emoji: '🌿', ac: 'ac-prz' }
  ],

  middle: [
    { id: 'mat', name: 'Matematyka', emoji: '📐', ac: 'ac-mat' },
    { id: 'pol', name: 'Polski',     emoji: '📝', ac: 'ac-pol' },
    { id: 'ang', name: 'Angielski',  emoji: '🌍', ac: 'ac-ang' },
    { id: 'bio', name: 'Biologia',   emoji: '🧬', ac: 'ac-bio' },
    { id: 'his', name: 'Historia',   emoji: '🏛️', ac: 'ac-his' },
    { id: 'che', name: 'Chemia',     emoji: '⚗️', ac: 'ac-che' },
    { id: 'fiz', name: 'Fizyka',     emoji: '⚡', ac: 'ac-fiz' },
    { id: 'geo', name: 'Geografia',  emoji: '🌎', ac: 'ac-geo' }
  ],

  high: [
    { id: 'mat', name: 'Matematyka', emoji: '∑',  ac: 'ac-mat' },
    { id: 'pol', name: 'Polski',     emoji: '✒️', ac: 'ac-pol' },
    { id: 'ang', name: 'Angielski',  emoji: '🌐', ac: 'ac-ang' },
    { id: 'bio', name: 'Biologia',   emoji: '🔬', ac: 'ac-bio' },
    { id: 'his', name: 'Historia',   emoji: '📜', ac: 'ac-his' },
    { id: 'che', name: 'Chemia',     emoji: '⚗️', ac: 'ac-che' },
    { id: 'fiz', name: 'Fizyka',     emoji: '🔭', ac: 'ac-fiz' },
    { id: 'geo', name: 'Geografia',  emoji: '🗺️', ac: 'ac-geo' }
  ]

};

module.exports = { SUBJECTS };
