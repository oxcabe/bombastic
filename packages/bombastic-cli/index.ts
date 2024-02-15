import path from "path";
import { parseArgs } from "util";
import { BOMGenerator } from "bombastic";

// Exit when this module is not directly called by Bun
if (!import.meta.main) {
  console.error("The CLI module must be called directly.");
  process.exit(1);
}

const { values, positionals } = parseArgs({
  args: Bun.argv,
  options: {
    "report-format": {
      type: "string",
      short: "f",
    },
    "ifc-file": {
      type: "string",
      short: "i",
    },
    output: {
      type: "string",
      short: "o",
    },
  },
  strict: true,
  // This is necessary since two positional arguments are always included
  allowPositionals: true,
});

const { "ifc-file": ifcFile, output } = values;
const bomGenerator = new BOMGenerator();

if (ifcFile !== undefined && output !== undefined) {
  console.log('Generating report for file: "%s"', ifcFile);
  bomGenerator.generate(ifcFile);

  const outputPath = path.resolve(process.cwd(), path.normalize(output));
  console.log('Generated report in path: "%s"', outputPath);
}
