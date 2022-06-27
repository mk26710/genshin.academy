/* eslint-env node */
import { access } from "fs/promises";
import { constants } from "fs";
import { basename, join, extname, dirname } from "path";
import { fileURLToPath } from "url";
import { globby } from "globby";
import sharp from "sharp";
import { Command } from "commander";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();
program.option(`-r`, `--regenerate`, false).parse(process.argv);

const pattern = join(__dirname, `./public`, `**/*.{png,jpg,jpeg}`);
const paths = await globby(pattern);

const fileExists = async (file) => {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

for (const p of paths) {
  const webpFileName = basename(p, extname(p)) + `.webp`;
  const webpFilePath = join(dirname(p), webpFileName);

  if ((await fileExists(webpFilePath)) && program.opts().r !== true) {
    console.log(`* Skipping ${webpFileName} since it already exists at ${webpFilePath}`);
    continue;
  }

  console.log(`* generating ${webpFilePath}...`);

  try {
    await sharp(p).webp({ lossless: true }).toFile(webpFilePath);
  } catch (e) {
    console.error(`SKIP - ERROR WHILE PROCESSING ${p} - ${e}`);
  }
}

console.log(`> finish`);
