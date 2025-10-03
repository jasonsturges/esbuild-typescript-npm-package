import * as esbuild from "esbuild";
import configs from "./esbuild.config.js";

const isWatch = process.argv.includes("--watch");

if (isWatch) {
  // Watch mode - build all formats with watch enabled
  const contexts = await Promise.all(
    configs.map((config) => esbuild.context(config)),
  );

  await Promise.all(contexts.map((ctx) => ctx.watch()));
  console.log("Watching for changes...");
} else {
  // Build mode - build all formats once
  await Promise.all(configs.map((config) => esbuild.build(config)));
  console.log("Build complete!");
}
