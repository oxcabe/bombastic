import path from "path";
import { renameSync } from "fs";
import type { BuildConfig } from "bun";
import dts from "bun-plugin-dts";

const cwd = process.cwd();
const outDir = path.resolve(cwd, "./dist/");

const baseBundleConfig: BuildConfig = {
  // TODO: get entryPoint from package.json "module" field
  entrypoints: [path.resolve(cwd, "./index.ts")],
  minify: true,
  splitting: true,
  outdir: outDir,
  plugins: [dts()],
};

const browserBundleConfig: BuildConfig = {
  ...baseBundleConfig,
  target: "browser",
  naming: "[dir]/bombastic.umd.cjs",
};

const nodeBundleConfig: BuildConfig = {
  ...baseBundleConfig,
  target: "node",
  naming: "[dir]/bombastic-node.mjs",
};

const bundleConfigs = [browserBundleConfig, nodeBundleConfig];

// Build all configurations
for (const bundleConfig of bundleConfigs) {
  await Bun.build(bundleConfig);
}

// Rename declaration file
renameSync(`${outDir}/index.d.ts`, `${outDir}/bombastic.d.ts`);
