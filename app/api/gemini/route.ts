import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "edge";

const SYSTEM_PROMPT =
  "You are a helpful assistant. Answer questions based ONLY on the provided document text. Be concise and accurate. If the answer is not in the document, say so.";

export async function POST(request: Request) {
  try {
    const { text, prompt } = (await request.json()) as {
      text?: string;
      prompt?: string;
    };
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    if (!text || !prompt) {
      return Response.json(
        { error: "Both text and prompt are required" },
        { status: 400 },
      );
    }

    const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
      model: "gemini-1.5-flash",
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
