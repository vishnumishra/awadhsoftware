/* Exercises netlify/functions/chat.mjs without deploying and without spending money.
 *
 * Part 1 covers validation and the no-API-key path.
 * Part 2 sets a fake key and stubs fetch, so the request the SDK actually puts on
 * the wire is checked - role mapping, system instruction, generation config - and
 * the response is parsed, all without touching Google. */

import handler from '../netlify/functions/chat.mjs';

const post = (body) =>
  new Request('https://awadhsoftware.com/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

const many = (n) => Array.from({ length: n }, () => ({ role: 'user', content: 'hi' }));

let failed = 0;
const check = (name, ok, note = '') => {
  if (!ok) failed++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${name}${note ? ' -> ' + note : ''}`);
};

/* ---------------------------------------------- part 1: validation, no key */

delete process.env.GEMINI_API_KEY;

const cases = [
  ['GET is rejected', new Request('https://x/api/chat', { method: 'GET' }), 405],
  ['messages omitted', post({}), 400],
  ['messages empty', post({ messages: [] }), 400],
  ['blank content only', post({ messages: [{ role: 'user', content: '   ' }] }), 400],
  ['conversation too long', post({ messages: many(40) }), 413],
  ['single message too long', post({ messages: [{ role: 'user', content: 'x'.repeat(5000) }] }), 413],
  ['valid request, no API key configured', post({ messages: [{ role: 'user', content: 'What do you build?' }] }), 200],
];

for (const [name, req, expected] of cases) {
  let res;
  try {
    res = await handler(req);
  } catch (err) {
    check(name, false, `threw ${err.message}`);
    continue;
  }
  let note = `${res.status}`;
  let ok = res.status === expected;
  if (ok && res.status === 200) {
    const data = await res.clone().json();
    ok = data.configured === false && String(data.completion).includes('70116 50803');
    note += ok ? ' graceful hand-off' : ' expected a graceful hand-off payload';
  }
  check(name, ok, note);
}

/* --------------------------------------- part 2: real call path, stubbed wire */

process.env.GEMINI_API_KEY = 'test-key-not-real';
const realFetch = globalThis.fetch;
let captured = null;

globalThis.fetch = async (url, init) => {
  captured = { url: String(url), body: init?.body ? JSON.parse(init.body) : null };
  return new Response(
    JSON.stringify({
      candidates: [{ content: { role: 'model', parts: [{ text: 'We build web and mobile apps.' }] }, finishReason: 'STOP' }],
    }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
};

try {
  const res = await handler(
    post({
      messages: [
        { role: 'user', content: 'Do you build mobile apps?' },
        { role: 'assistant', content: 'Yes we do.' },
        { role: 'user', content: 'What about iOS?' },
      ],
    })
  );
  const data = await res.json();

  check('upstream call succeeds', res.status === 200, `${res.status}`);
  check('model reply is returned', data.completion === 'We build web and mobile apps.', data.completion);
  check('request reached Gemini endpoint', !!captured && captured.url.includes('generativelanguage.googleapis.com'), captured?.url);

  const sent = captured?.body ?? {};
  const roles = (sent.contents ?? []).map((c) => c.role);
  check('assistant turn mapped to "model"', JSON.stringify(roles) === JSON.stringify(['user', 'model', 'user']), roles.join(','));
  check('message text carried in parts', sent.contents?.[0]?.parts?.[0]?.text === 'Do you build mobile apps?');
  check('server-side system instruction sent', JSON.stringify(sent.systemInstruction ?? '').includes('Awadh AI'));
  check('output cap sent', sent.generationConfig?.maxOutputTokens === 700, String(sent.generationConfig?.maxOutputTokens));
  check('thinking disabled for latency', sent.generationConfig?.thinkingConfig?.thinkingBudget === 0);

  /* A safety block must hand off rather than surface an empty bubble. */
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ candidates: [{ finishReason: 'SAFETY', content: { role: 'model', parts: [] } }] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  const blocked = await (await handler(post({ messages: [{ role: 'user', content: 'hi' }] }))).json();
  check('blocked response hands off', blocked.blocked === true && String(blocked.completion).includes('70116 50803'));

  /* Upstream failure must not leak a stack trace to the visitor. */
  globalThis.fetch = async () => new Response('{"error":{"message":"boom"}}', { status: 500 });
  const failedCall = await (await handler(post({ messages: [{ role: 'user', content: 'hi' }] }))).json();
  check('upstream 500 hands off', String(failedCall.completion).includes('70116 50803'));
} finally {
  globalThis.fetch = realFetch;
  delete process.env.GEMINI_API_KEY;
}

console.log(failed ? `\n  ${failed} check(s) failed` : '\n  all checks passed');
process.exit(failed ? 1 : 0);
