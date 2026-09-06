/* Production runtime shim. build.mjs injects this ahead of the application code.
   It exists so the design-synced sources in components/ never need editing. */

/* 1. The Tweaks panel is an authoring affordance from Claude Design. It talks to a
      parent frame that does not exist on the public site, so it is left out of the
      production bundle and these no-op stubs stand in for the globals app.jsx uses. */
function useTweaks(defaults) { return [defaults, function () {}]; }
function TweaksPanel() { return null; }
function TweakSection() { return null; }
function TweakRow() { return null; }
function TweakSlider() { return null; }
function TweakToggle() { return null; }
function TweakRadio() { return null; }
function TweakSelect() { return null; }
function TweakText() { return null; }
function TweakNumber() { return null; }
function TweakColor() { return null; }
function TweakButton() { return null; }

/* 2. components/chatbot.jsx calls window.claude.complete(), which is provided by
      Claude's design preview and is absent in a browser. Point it at our own
      endpoint so the widget works once ANTHROPIC_API_KEY is set in Netlify. */
if (!window.claude || typeof window.claude.complete !== 'function') {
  window.claude = {
    complete: async function (options) {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: (options && options.messages) || [] }),
      });
      if (!response.ok) throw new Error('chat endpoint returned ' + response.status);
      const data = await response.json();
      if (typeof data.completion !== 'string') throw new Error('chat endpoint returned no completion');
      return data.completion;
    },
  };
}
