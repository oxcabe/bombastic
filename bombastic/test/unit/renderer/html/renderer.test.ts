import { describe, expect, test } from "bun:test";
import { IfcAPI } from "web-ifc";
import { BOMObject } from "bombastic/model/bom";
import { HTMLRenderer } from "bombastic/renderer";
import { loadIfcFromFile } from "bombastic/utils";

describe("HTMLRenderer", async () => {
  const renderer = new HTMLRenderer();
  const ifcFilePath = Bun.resolveSync(
    "test/fixtures/example.ifc",
    process.cwd(),
  );

  const ifcApi = new IfcAPI();
  await ifcApi.Init();

  const modelId = await loadIfcFromFile(ifcFilePath, ifcApi);
  const bomObject = new BOMObject(modelId, ifcApi);

  describe("toReadableStream", async () => {
    const exampleBOMHTMLFilePath = Bun.resolveSync(
      "test/fixtures/exampleBOM.html",
      process.cwd(),
    );

    const exampleBOMHTML = await Bun.file(exampleBOMHTMLFilePath).text();

    test("should return a string that converts to expected HTML", async () => {
      const stream = await renderer.toReadableStream(bomObject);
      const streamText = await Bun.readableStreamToText(stream);

      expect(streamText).toStrictEqual(exampleBOMHTML);
    });
  });
});
