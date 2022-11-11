import { Buffer } from "node:buffer";

import sharp from "~/lib/sharp.server";

const COMPRESSION_QUALITY = 80;

export const bufferToWebp = async (buffer: Buffer) => {
  return await sharp(buffer).webp({ quality: COMPRESSION_QUALITY }).toBuffer();
};

export const arrayBufferToWebp = async (arrayBuffer: ArrayBuffer) => {
  return await bufferToWebp(Buffer.from(arrayBuffer));
};
