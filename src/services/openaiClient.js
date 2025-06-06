// src/services/openaiClient.js
import OpenAI from "openai";

/**
 * WARNING ────────────────
 * Putting a secret key in client-side code exposes it to anyone
 * who opens DevTools.  Use this only for local prototyping.
 * For production, proxy the request on a tiny backend and keep
 * the key on the server.
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,   // project-scoped key
  dangerouslyAllowBrowser: true                 // ← REQUIRED in browsers
  // project: "proj_nBsAP…"   // optional; the key already pins the project
});

export default openai;
