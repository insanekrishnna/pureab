export async function htmlToPdf(html: string): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const container = document.createElement("div");

  container.style.width = "560px";
  container.style.maxWidth = "560px";
  container.style.fontFamily = "var(--font-geist-sans), system-ui, sans-serif";
  container.style.fontSize = "12px";
  container.style.lineHeight = "1.6";
  container.style.color = "var(--text-primary)";
  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    await new Promise<void>((resolve) => {
      doc.html(container, {
        callback: () => resolve(),
        x: 36,
        y: 36,
        width: 523,
        windowWidth: 720,
      });
    });

    return doc.output("blob");
  } finally {
    container.remove();
  }
}
