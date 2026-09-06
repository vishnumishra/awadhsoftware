// Chatbot backend for the "Awadh AI" widget.
//
// The widget in components/chatbot.jsx calls window.claude.complete(), which only
// exists inside Claude's design preview. In production the shim added by build.mjs
// points that call here instead.
//
// Set ANTHROPIC_API_KEY in the Netlify UI (Site settings > Environment variables)
// to switch the assistant on. Without it the endpoint stays up and returns a
// polite hand-off message, so the widget degrades instead of erroring.

import Anthropic from '@anthropic-ai/sdk';

const MODEL = process.env.CHAT_MODEL || 'claude-opus-5';
const MAX_MESSAGES = 24;
const MAX_CHARS_PER_MESSAGE = 4000;
const MAX_TOTAL_CHARS = 24000;

// Enforced server-side. The browser also sends its own preamble, but this is the
// instruction the model actually takes its identity and limits from, so the
// endpoint cannot be repurposed as a general-purpose LLM.
const SYSTEM = `You are "Awadh AI", the assistant on awadhsoftware.com for Awadh Software Solutions,
a software development and digital marketing studio in Ayodhya, Uttar Pradesh, India.
Founded in 2014 by Vishnu Mishra. 11+ years, 50+ projects shipped.
Services: web apps, iOS and Android apps, AI/ML and agentic products, AI chatbots,
digital marketing, SEO and LLM SEO.
Contact: +91 70116 50803 (call or WhatsApp), info@awadhsoftwaresolutions.com,
HIG A-11 Saketpuri, Ayodhya.

Rules:
- Answer only questions about this company, its services, process, and how it could help the visitor.
- If asked for something unrelated (general coding help, homework, writing tasks, other companies),
  briefly decline and steer back to what Awadh Software can do.
- Never invent prices or delivery dates. Ask for scope, then offer WhatsApp or the contact form.
- Be concise: two to four sentences unless more detail is genuinely needed. Warm and professional.
- Reply in the language the visitor writes in. Hindi in Devanagari when they write Hindi;
  technical terms may stay in English.
- An occasional tasteful diya emoji is fine. Do not overdo emoji.`;

const HANDOFF =
  "Our AI assistant isn't switched on right now. " +
  'For anything at all, WhatsApp or call +91 70116 50803, or email info@awadhsoftwaresolutions.com. ' +
  'A real person replies within a few hours.';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let payload;
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Malformed JSON body' }, 400);
  }

  const incoming = Array.isArray(payload?.messages) ? payload.messages : null;
  if (!incoming || incoming.length === 0) return json({ error: 'messages[] is required' }, 400);
  if (incoming.length > MAX_MESSAGES) return json({ error: 'Conversation too long' }, 413);

  let total = 0;
  const messages = [];
  for (const m of incoming) {
    const role = m?.role === 'assistant' ? 'assistant' : 'user';
    const content = typeof m?.content === 'string' ? m.content : '';
    if (!content.trim()) continue;
    if (content.length > MAX_CHARS_PER_MESSAGE) return json({ error: 'Message too long' }, 413);
    total += content.length;
    if (total > MAX_TOTAL_CHARS) return json({ error: 'Conversation too long' }, 413);
    messages.push({ role, content });
  }
  if (messages.length === 0) return json({ error: 'No usable message content' }, 400);
  if (messages[0].role !== 'user') messages.unshift({ role: 'user', content: 'Hello' });

  // No key configured: stay up, hand the visitor to a human.
  if (!process.env.ANTHROPIC_API_KEY) return json({ completion: HANDOFF, configured: false });

  const client = new Anthropic({
    // Netlify's synchronous functions stop at ~10s, so fail before the platform does.
    timeout: 8500,
    maxRetries: 0,
  });

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 700,
      system: SYSTEM,
      // Keep replies quick and cheap; this is a short front-of-site Q&A.
      output_config: { effort: 'low' },
      messages,
    });

    if (response.stop_reason === 'refusal') {
      return json({ completion: HANDOFF, refused: true });
    }

    const text = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();

    return json({ completion: text || HANDOFF });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error('[chat] ANTHROPIC_API_KEY rejected');
      return json({ completion: HANDOFF, configured: false });
    }
    if (error instanceof Anthropic.RateLimitError) {
      console.error('[chat] rate limited');
      return json({ completion: 'We are getting a lot of questions right now. ' + HANDOFF }, 200);
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`[chat] API error ${error.status}: ${error.message}`);
    } else {
      console.error('[chat] unexpected failure', error);
    }
    return json({ completion: HANDOFF, error: true });
  }
};
