import fs from "node:fs/promises";
import { join } from "node:path";

let isCached = false;
let cachedStyles = "";

export const tailwindStyles = async () => {
  if (process.env.NODE_ENV === "production" && isCached === true) {
    return cachedStyles;
  }

  const cssFile = join(process.cwd(), "./app/styles/tailwind.css");
  const css = await fs.readFile(cssFile, { encoding: "utf-8" });
  console.log("[CSS] tailwind.css file read");

  cachedStyles = css;
  isCached = true;

  return css;
};
