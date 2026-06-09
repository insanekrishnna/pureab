import { uint8ArrayToBlob } from "@/lib/utils/blob";

interface PasswordSaveOptions {
  ownerPassword?: string;
  userPassword?: string;
  permissions?: Record<string, boolean>;
}

export async function encryptPdf(file: File, password: string): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.load(await file.arrayBuffer(), {
    ignoreEncryption: true,
  });
  const saveOptions = {
    ownerPassword: password,
    userPassword: password,
    permissions: {
      printing: true,
      modifying: false,
      copying: false,
      annotating: false,
      fillingForms: false,
      contentAccessibility: true,
      documentAssembly: false,
    },
  } satisfies PasswordSaveOptions;
  const bytes = await pdf.save(
    saveOptions as unknown as Parameters<typeof pdf.save>[0],
  );

  return uint8ArrayToBlob(bytes, "application/pdf");
}

export async function decryptPdf(file: File, password: string): Promise<Blob> {
  const { PDFDocument } = await import("pdf-lib");
  const loadOptions = {
    password,
    ignoreEncryption: false,
  } as unknown as Parameters<typeof PDFDocument.load>[1];
  const pdf = await PDFDocument.load(await file.arrayBuffer(), loadOptions);
  const bytes = await pdf.save();

  return uint8ArrayToBlob(bytes, "application/pdf");
}
