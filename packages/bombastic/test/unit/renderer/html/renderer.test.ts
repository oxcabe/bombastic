import { beforeEach, describe, expect, test } from "bun:test";
import { HTMLRenderer, HTMLRender } from "bombastic/renderer";
import { createCore } from "test/fixtures/utils";

describe("HTMLRenderer", async () => {
  const renderer = new HTMLRenderer();
  const { bomObject, exampleBOMHTMLFile } = await createCore();

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
