import { ENV, whatsappWithText } from './site';

export type LeadPayload = Record<string, string | undefined>;

// Sends a lead to Formspree when configured. Without a form ID we fall back to
// opening WhatsApp with the brief pre-filled so no enquiry is ever lost.
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; via: 'formspree' | 'whatsapp' }> {
  if (ENV.formspreeId) {
    const res = await fetch(`https://formspree.io/f/${ENV.formspreeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, via: 'formspree' };
  }
  const lines = Object.entries(payload)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`);
  window.open(whatsappWithText(`Hi Awadh Software Solutions,\n${lines.join('\n')}`), '_blank', 'noopener');
  return { ok: true, via: 'whatsapp' };
}
