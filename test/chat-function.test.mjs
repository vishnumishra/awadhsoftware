/* Exercises netlify/functions/chat.mjs without deploying and without spending money:
   every case here either fails validation or takes the no-API-key path. */

import handler from '../netlify/functions/chat.mjs';

const post = (body) =>
  new Request('https://awadhsoftware.com/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

const many = (n) => Array.from({ length: n }, () => ({ role: 'user', content: 'hi' }));

const cases = [
  ['GET is rejected', new Request('https://x/api/chat', { method: 'GET' }), 405],
  ['messages omitted', post({}), 400],
  ['messages empty', post({ messages: [] }), 400],
  ['blank content only', post({ messages: [{ role: 'user', content: '   ' }] }), 400],
  ['conversation too long', post({ messages: many(40) }), 413],
  ['single message too long', post({ messages: [{ role: 'user', content: 'x'.repeat(5000) }] }), 413],
  ['valid request, no API key configured', post({ messages: [{ role: 'user', content: 'What do you build?' }] }), 200],
];

// Guarantee the no-key branch: this test must never reach the real API.
delete process.env.ANTHROPIC_API_KEY;

let failed = 0;
for (const [name, req, expected] of cases) {
  let res;
  try {
    res = await handler(req);
  } catch (err) {
    failed++;
    console.log(`  FAIL  ${name}: threw ${err.message}`);
    continue;
  }
  const ok = res.status === expected;
  if (!ok) failed++;
  let note = '';
  if (res.status === 200) {
    const data = await res.clone().json();
    const graceful = data.configured === false && typeof data.completion === 'string' && data.completion.includes('70116 50803');
    if (!graceful) {
      failed++;
      note = ' -> expected a graceful hand-off payload';
    } else {
      note = ' -> graceful hand-off to phone/email';
    }
  }
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${name}: ${res.status} (expected ${expected})${note}`);
}

console.log(failed ? `\n  ${failed} case(s) failed` : `\n  all ${cases.length} cases passed`);
process.exit(failed ? 1 : 0);
