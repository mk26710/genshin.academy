import path from "path";
import { fileURLToPath } from "url";

import { globby } from "globby";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pattern = path.join(__dirname, "./public", "**/*.{png,jpg,jpeg}");
const paths = await globby(pattern);

paths.forEach(async (p) => {
  const webpFileName = path.basename(p, path.extname(p)) + ".webp";
  const webpFilePath = path.join(path.dirname(p), webpFileName);

  console.log(`* generating ${webpFilePath}...`);

  try {
    await sharp(p)
      .webp({ nearLossless: true })
      .toFile(webpFilePath);
  } catch (e) {
    console.error(`SKIP - ERROR WHILE PROCESSING ${p} - ${e}`);
  }
});
