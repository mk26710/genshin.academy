/* eslint-env node */
import fs from "fs/promises";

await fs.copyFile(`.cloudflare/pages/404.html`, `dist/404.html`);
console.log(`* 404.html was copied to dist/`);
