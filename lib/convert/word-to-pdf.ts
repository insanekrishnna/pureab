export async function wordToPdf(file: File): Promise<Blob> {
  const mammoth = await import("mammoth");
  const { jsPDF } = await import("jspdf");
  
  // Extract clean plain text instantly, avoiding complex DOM rendering
  const { value: rawText } = await mammoth.extractRawText({
    arrayBuffer: await file.arrayBuffer(),
  });

  // Create a new PDF document (A4 size, points unit)
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  
  // A4 dimensions in pt: roughly 595 x 842. 
  // We use 40pt margins, so max width is ~515pt.
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxLineWidth = pageWidth - margin * 2;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  // Let jsPDF handle word wrapping
  const lines = doc.splitTextToSize(rawText, maxLineWidth);
  
  let cursorY = margin;
  const lineHeight = 14;

  for (let i = 0; i < lines.length; i++) {
    // If we exceed the page height, add a new page
    if (cursorY + lineHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }
    doc.text(lines[i], margin, cursorY);
    cursorY += lineHeight;
  }

  return doc.output("blob");
}
