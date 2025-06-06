// src/services/hfClient.js
const HF_API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;

// The model we’ll call.  You can swap to any other chat-capable model.
const HF_MODEL = "HuggingFaceH4/zephyr-7b-beta";

/**
 * Very small helper that emulates the shape of `openai.chat.completions.create`
 *
 * @param {Array<{role:string,content:string}>} messages  Chat history
 * @param {number} max_tokens  Approximate length of reply
 * @returns {Promise<string>}  Assistant reply text
 */
export async function chatCompletion({ messages, max_tokens = 1024 }) {
  // Flatten the chat into a single prompt.  Simple but works.
  const prompt = messages
    .map(({ role, content }) => `${role.toUpperCase()}: ${content}`)
    .join("\n\n")
    .concat("\n\nASSISTANT:");

      const res = await fetch(
            // URI-encode in case the model id ever contains spaces or slashes
            `https://api-inference.huggingface.co/models/${encodeURIComponent(HF_MODEL)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: max_tokens, temperature: 0.3 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `HuggingFace API error ${res.status}: ${err.error || res.statusText}`
    );
  }

//   const data = await res.json();
//   // HF returns [{generated_text:"..."}]
//   const text =
//     Array.isArray(data) && data[0]?.generated_text
//       ? data[0].generated_text.replace(prompt, "").trim()
//       : "[No text returned]";
  const data = await res.json();                // 200 or 503 both return JSON
  const text =
    Array.isArray(data) && data[0]?.generated_text
      ? data[0].generated_text.replace(prompt, "").trim()
      : data.error                               // "Model is currently loading"
        ? `[${data.error}]`
        : "[No text returned]";
  return text;
}
