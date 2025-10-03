import { rollup, watch } from "rollup";
import dts from "rollup-plugin-dts";

const isWatch = process.argv.includes("--watch");

const config = {
  input: "src/index.ts",
  output: { file: "dist/index.d.ts", format: "es" },
  plugins: [dts()],
};

if (isWatch) {
  const watcher = watch(config);

  watcher.on("event", (event) => {
    if (event.code === "BUNDLE_START") {
      console.log("Building types...");
    } else if (event.code === "BUNDLE_END") {
      console.log("Types rebuilt!");
      event.result.close();
    } else if (event.code === "ERROR") {
      console.error("Type generation error:", event.error);
    }
  });

  console.log("Watching for type changes...");
} else {
  const bundle = await rollup(config);
  await bundle.write(config.output);
  await bundle.close();
  console.log("Types generated!");
}
