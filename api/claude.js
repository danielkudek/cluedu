// Przedmioty wymagające lepszego rozumowania → Sonnet
const SONNET_SUBJECTS = ['mat', 'fiz', 'che'];
const SONNET_MODEL = 'claude-sonnet-4-6';
const HAIKU_MODEL  = 'claude-haiku-4-5-20251001';

const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, systemPrompt, subjId } = req.body;
  if (!messages || !systemPrompt) return res.status(400).json({ error: 'Brak danych' });

  const model = SONNET_SUBJECTS.includes(subjId) ? SONNET_MODEL : HAIKU_MODEL;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'prompt-caching-2024-07-31'
      },
      body: JSON.stringify({
        model,
        max_tokens: 600,
        system: [
          {
            type: 'text',
            text: systemPrompt,
            cache_control: { type: 'ephemeral' }
          }
        ],
        messages
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Anthropic error:', err);
      return res.status(response.status).json(err);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Błąd serwera: ' + error.message });
  }
};

module.exports = handler;
