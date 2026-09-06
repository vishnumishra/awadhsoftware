// Chatbot backend for the "Awadh AI" widget, powered by Google Gemini.
//
// The widget in components/chatbot.jsx calls window.claude.complete(), which only
// exists inside Claude's design preview. In production the shim added by build.mjs
// points that call here instead.
//
// Set GEMINI_API_KEY in the Netlify UI (Site settings > Environment variables) to
// switch the assistant on. Get a key from https://aistudio.google.com/apikey.
// Without it the endpoint stays up and returns a polite hand-off message, so the
// widget degrades instead of erroring.

import { GoogleGenAI, ApiError } from '@google/genai';

const MODEL = process.env.CHAT_MODEL || 'gemini-2.5-flash';
const MAX_MESSAGES = 24;
const MAX_CHARS_PER_MESSAGE = 4000;
const MAX_TOTAL_CHARS = 24000;
// Netlify's synchronous functions stop at ~10s, so give up before the platform does.
const TIMEOUT_MS = 8500;

// Enforced server-side. The browser also sends its own preamble, but this is the
// instruction the model actually takes its identity and limits from, so the
// endpoint cannot be repurposed as a general-purpose chatbot.
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
  const contents = [];
  for (const m of incoming) {
    // Gemini names the assistant turn "model", not "assistant".
    const role = m?.role === 'assistant' || m?.role === 'model' ? 'model' : 'user';
    const text = typeof m?.content === 'string' ? m.content : '';
    if (!text.trim()) continue;
    if (text.length > MAX_CHARS_PER_MESSAGE) return json({ error: 'Message too long' }, 413);
    total += text.length;
    if (total > MAX_TOTAL_CHARS) return json({ error: 'Conversation too long' }, 413);
    contents.push({ role, parts: [{ text }] });
  }
  if (contents.length === 0) return json({ error: 'No usable message content' }, 400);
  // A conversation has to open on a user turn.
  if (contents[0].role !== 'user') contents.unshift({ role: 'user', parts: [{ text: 'Hello' }] });

  // No key configured: stay up, hand the visitor to a human.
  if (!process.env.GEMINI_API_KEY) return json({ completion: HANDOFF, configured: false });

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const abort = AbortSignal.timeout(TIMEOUT_MS);

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM,
        maxOutputTokens: 700,
        temperature: 0.6,
        // Front-of-site Q&A does not need deliberation, and the latency budget is tight.
        thinkingConfig: { thinkingBudget: 0 },
        abortSignal: abort,
      },
    });

    const finish = response.candidates?.[0]?.finishReason;
    if (finish === 'SAFETY' || finish === 'PROHIBITED_CONTENT' || finish === 'BLOCKLIST' || finish === 'SPII') {
      console.warn(`[chat] response blocked, finishReason=${finish}`);
      return json({ completion: HANDOFF, blocked: true });
    }

    const text = (response.text || '').trim();
    return json({ completion: text || HANDOFF });
  } catch (error) {
    if (error?.name === 'AbortError' || error?.name === 'TimeoutError') {
      console.error('[chat] upstream timed out');
      return json({ completion: 'That took longer than expected. ' + HANDOFF });
    }
    if (error instanceof ApiError) {
      if (error.status === 401 || error.status === 403) {
        console.error('[chat] GEMINI_API_KEY rejected');
        return json({ completion: HANDOFF, configured: false });
      }
      if (error.status === 429) {
        console.error('[chat] rate limited by Gemini');
        return json({ completion: 'We are getting a lot of questions right now. ' + HANDOFF });
      }
      console.error(`[chat] Gemini API error ${error.status}: ${error.message}`);
    } else {
      console.error('[chat] unexpected failure', error);
    }
    return json({ completion: HANDOFF, error: true });
  }
};
