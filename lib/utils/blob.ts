export function uint8ArrayToBlob(bytes: Uint8Array, type: string): Blob {
  const buffer = bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;

  return new Blob([buffer], { type });
}
