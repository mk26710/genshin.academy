/* eslint-env node */
import { constants } from "fs";
import { access } from "fs/promises";
import { basename, join, extname, dirname } from "path";
import { fileURLToPath } from "url";

import { Command } from "commander";
import { globby } from "globby";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();
program.option("-r", "--regenerate", false).option("-o", "--optimize", false).parse(process.argv);

const pattern = join(__dirname, "./public", "**/*.{png,jpg,jpeg}");
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
  const webpFileName = basename(p, extname(p)) + ".webp";
  const webpFilePath = join(dirname(p), webpFileName);

  if ((await fileExists(webpFilePath)) && program.opts().r !== true) {
    console.log(`* Skipping ${webpFileName} since it already exists at ${webpFilePath}`);
  } else {
    console.log(`* generating ${webpFilePath}...`);

    try {
      await sharp(p).webp({ quality: 90 }).toFile(webpFilePath);
    } catch (e) {
      console.error(`SKIP - ERROR WHILE PROCESSING ${p} - ${e}`);
    }
  }

  if (program.opts().o === true) {
    const webp1200FileName = basename(p, extname(p)) + "_1200.webp";
    const webp1200FilePath = join(dirname(p), webp1200FileName);

    if ((await fileExists(webp1200FilePath)) && program.opts().r !== true) {
      console.log(`* Skipping ${webp1200FileName} since it already exists at ${webp1200FilePath}`);
    } else {
      console.log(`* generating ${webp1200FilePath}...`);

      let newHeight = 1200;

      const metadata = await sharp(p).metadata();
      if (metadata.height != null && metadata.height < newHeight) {
        newHeight = metadata.height;
      }

      try {
        await sharp(p).resize({ height: newHeight }).webp({ quality: 75 }).toFile(webp1200FilePath);
      } catch (e) {
        console.error(`SKIP - ERROR WHILE PROCESSING ${p} - ${e}`);
      }
    }
  }
}

console.log("> finish");
