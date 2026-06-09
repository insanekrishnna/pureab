export async function excelToPdf(file: File): Promise<Blob> {
  const XLSX = await import("xlsx");
  const { jsPDF } = await import("jspdf");
  const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const container = document.createElement("div");

  container.style.width = "560px";
  container.style.fontFamily = "var(--font-geist-sans), system-ui, sans-serif";
  container.style.fontSize = "10px";
  container.style.lineHeight = "1.4";

  container.innerHTML = workbook.SheetNames.map((name) => {
    const sheet = workbook.Sheets[name];
    const table = XLSX.utils.sheet_to_html(sheet);
    return `<section><h2>${escapeHtml(name)}</h2>${table}</section>`;
  }).join("");

  document.body.appendChild(container);

  try {
    await new Promise<void>((resolve) => {
      doc.html(container, {
        callback: () => resolve(),
        x: 24,
        y: 24,
        width: 547,
        windowWidth: 900,
      });
    });

    return doc.output("blob");
  } finally {
    container.remove();
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
