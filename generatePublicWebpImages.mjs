import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { globby } from "globby";
import sharp from "sharp";
import { Command } from 'commander';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileExists = async (path) => !!(await fs.promises.stat(path).catch(e => false));

const program = new Command();
program
  .option("-r", "--regenerate", false)
  .parse(process.argv);

const pattern = path.join(__dirname, "./public", "**/*.{png,jpg,jpeg}");
const paths = await globby(pattern);

for (const p of paths) {
  const webpFileName = path.basename(p, path.extname(p)) + ".webp";
  const webpFilePath = path.join(path.dirname(p), webpFileName);

  if (fileExists(webpFilePath) && !program.opts().r) {
    console.log(`* Skipping ${webpFileName} since it already exists at ${webpFilePath}`);
    continue;
  }

  console.log(`* generating ${webpFilePath}...`);

  try {
    await sharp(p)
      .webp({ nearLossless: true })
      .toFile(webpFilePath);
  } catch (e) {
    console.error(`SKIP - ERROR WHILE PROCESSING ${p} - ${e}`);
  }
}

console.log("> finish")