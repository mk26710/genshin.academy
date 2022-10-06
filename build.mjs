import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./server.ts"],
    outdir: "build",
    bundle: true,
    minify: true,
    platform: "node",
    sourcemap: true,
    target: "node18",
    format: "cjs",
  })
  .then(() => {
    console.log("\n\n  Compiled to build/server.js\n\n");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
