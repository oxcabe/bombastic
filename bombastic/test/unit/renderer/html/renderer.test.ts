import { beforeEach, describe, expect, test } from "bun:test";
import { IfcAPI } from "web-ifc";
import { BOMObject } from "bombastic/model/bom";
import { HTMLRenderer, HTMLRender } from "bombastic/renderer";
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

  const exampleBOMHTMLFilePath = Bun.resolveSync(
    "test/fixtures/exampleBOM.html",
    process.cwd(),
  );

  const exampleBOMHTMLFile = Bun.file(exampleBOMHTMLFilePath);
  const exampleBOMHTMLText = await exampleBOMHTMLFile.text();

  describe("HTMLRenderer", async () => {
    describe("render", async () => {
      test("should return a HTMLRender containing the expected HTML", async () => {
        const render = await renderer.render(bomObject);
        const renderText = await render.toString();

        expect(renderText).toStrictEqual(exampleBOMHTMLText);
      });
    });
  });

  describe("HTMLRender", async () => {
    let exampleBOMHTMLStream: ReadableStream;

    beforeEach(() => {
      exampleBOMHTMLStream = exampleBOMHTMLFile.stream();
    });

    describe("toString", async () => {
      test("should return a string containing the expected HTML", async () => {
        const render = new HTMLRender(exampleBOMHTMLStream);
        const renderText = await render.toString();

        expect(renderText).toStrictEqual(exampleBOMHTMLText);
      });
    });

    // describe("toFile", async () => {
    //   test("should create a file containing the expected HTML", async () => {
    //     const render = new HTMLRender(exampleBOMHTMLStream);
    //     await render.toFile("./bom.html");
    //   });
    // });
  });
});
