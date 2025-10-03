import * as esbuild from 'esbuild';

const ctx = await esbuild.context({
  entryPoints: ['examples/index.ts'],
  bundle: true,
  outfile: 'examples/index.js',
  sourcemap: true,
  format: 'esm',
});

await ctx.watch();
const { host, port } = await ctx.serve({
  servedir: 'examples',
  port: 3000,
});

console.log(`Dev server running at http://${host}:${port}`);
