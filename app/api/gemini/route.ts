import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

const SYSTEM_PROMPT =
  "You are a helpful assistant. Answer questions based ONLY on the provided document text. Be concise and accurate. If the answer is not in the document, say so.";
const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

function validateGeminiApiKey(apiKey: string | undefined) {
  const key = apiKey?.trim();

  if (!key) {
    return {
      ok: false,
      error: "Missing GEMINI_API_KEY. Add it to .env.local and restart the server.",
    } as const;
  }

  if (/your|placeholder|paste|key_here|xxx/i.test(key)) {
    return {
      ok: false,
      error:
        "GEMINI_API_KEY is still set to a placeholder. Add a real Gemini API key to .env.local and restart the server.",
    } as const;
  }

  if (key.startsWith("AQ.")) {
    return {
      ok: false,
      error:
        "GEMINI_API_KEY starts with AQ., which is not accepted by the Gemini API key flow used here. Create or restore a Google AI Studio API key that starts with AIza, then update .env.local and restart the server.",
    } as const;
  }

  if (!key.startsWith("AIza")) {
    return {
      ok: false,
      error:
        "GEMINI_API_KEY does not look like a Google AI Studio Gemini key. It should usually start with AIza.",
    } as const;
  }

  return { ok: true, key } as const;
}

export async function POST(request: Request) {
  try {
    const { text, prompt } = (await request.json()) as {
      text?: string;
      prompt?: string;
    };
    const apiKey = validateGeminiApiKey(process.env.GEMINI_API_KEY);

    if (!apiKey.ok) {
      return Response.json({ error: apiKey.error }, { status: 500 });
    }

    if (!text || !prompt) {
      return Response.json(
        { error: "Both text and prompt are required" },
        { status: 400 },
      );
    }

    const model = new GoogleGenerativeAI(apiKey.key).getGenerativeModel({
      model: process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL,
      systemInstruction: SYSTEM_PROMPT,
    });
    const stream = await model.generateContentStream([
      `Document text:\n${text.slice(0, 30000)}\n\nUser task:\n${prompt}`,
    ]);
    const encoder = new TextEncoder();

    return new Response(
      new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream.stream) {
              const token = chunk.text();
              if (token) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(token)}\n\n`),
                );
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Gemini request failed" },
      { status: 500 },
    );
  }
}
