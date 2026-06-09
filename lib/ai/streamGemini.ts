export async function streamGemini(
  text: string,
  prompt: string,
  onToken: (token: string) => void,
) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, prompt }),
  });

  if (!response.ok || !response.body) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error ?? "Gemini request failed");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      const line = event
        .split("\n")
        .find((entry) => entry.startsWith("data: "));
      const data = line?.slice(6);

      if (!data || data === "[DONE]") continue;
      onToken(JSON.parse(data) as string);
    }
  }
}
