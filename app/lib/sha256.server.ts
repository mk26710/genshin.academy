import crypto from "node:crypto";

export const sha256HexFromBuffer = async (buf: Buffer) => {
  const shasum = crypto.createHash("sha256");
  const hex = shasum.update(buf).digest("hex");

  return hex;
};
