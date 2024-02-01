import path from "path";
import type { BuildConfig } from "bun";

const baseBundleConfig: BuildConfig = {
  // TODO: get entryPoint from package.json "module" field
  entrypoints: [path.resolve(process.cwd(), "./index.ts")],
  minify: true,
  splitting: true,
  outdir: path.resolve(process.cwd(), "./build/dist/"),
};

const browserBundleConfig: BuildConfig = {
  ...baseBundleConfig,
  target: "browser",
  naming: "[dir]/[name]-browser.[ext]",
};

const bunBundleConfig: BuildConfig = {
  ...baseBundleConfig,
  target: "bun",
  naming: "[dir]/[name]-bun.[ext]",
};

const nodeBundleConfig: BuildConfig = {
  ...baseBundleConfig,
  target: "node",
  naming: "[dir]/[name]-node.[ext]",
};

const bundleConfigs = [browserBundleConfig, bunBundleConfig, nodeBundleConfig];

for (const bundleConfig of bundleConfigs) {
  await Bun.build(bundleConfig);
}
