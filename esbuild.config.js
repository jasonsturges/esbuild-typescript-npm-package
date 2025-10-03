import * as esbuild from "esbuild";

const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: true,
  external: ["react", "react-dom"],
};

const configs = [
  // ES Module (for modern bundlers)
  {
    ...baseConfig,
    format: "esm",
    outfile: "dist/index.es.js",
  },
  // CommonJS (for Node.js)
  {
    ...baseConfig,
    format: "cjs",
    outfile: "dist/index.cjs.js",
  },
  // UMD (Universal Module Definition)
  {
    ...baseConfig,
    format: "iife",
    globalName: "mylib",
    outfile: "dist/index.umd.js",
    footer: {
      js: 'if (typeof module !== "undefined" && module.exports) { module.exports = mylib; }',
    },
  },
  // IIFE (for direct browser use)
  {
    ...baseConfig,
    format: "iife",
    globalName: "mylib",
    outfile: "dist/index.iife.js",
  },
];

export default configs;
