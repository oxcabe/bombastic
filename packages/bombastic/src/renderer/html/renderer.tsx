import { renderToReadableStream } from "react-dom/server";
import { BOMObject } from "bombastic/model/bom";
import { HTMLBOMDocument } from "bombastic/renderer/html/template";
import type { ExportFormat, Renderer, Render } from "bombastic/renderer";

/**
 * Render implementation for HTML documents.
 */
export class HTMLRender implements Render {
  /**
   * Instantiates an exportable HTML render.
   * @param stream Stream resulting from the rendering process.
   */
  constructor(readonly stream: ReadableStream) {}

  /**
   * Converts the render to its string representation.
   * @returns the HTML string, wrapped into Promise.
   */
  public toString = async (): Promise<string> => {
    return await Bun.readableStreamToText(this.stream);
  };

  /**
   * Saves the rendered HTML document into a file.
   * @param filePath Save path of the rendered HTML document.
   */
  public toFile = async (filePath: string) => {
    const response = new Response(this.stream);
    await Bun.write(filePath, response);
  };
}

/**
 * HTML BoM document implementation of Renderer.
 */
export class HTMLRenderer implements Renderer {
  /**
   * HTML export format string.
   */
  public readonly type: ExportFormat = "html";

  /**
   * Renders BoM information into an HTML document render representation.
   * @param bomObject Object containing BoM related information.
   * @returns The HTML document render representation, wrapped into a Promise.
   */
  public render = async (bomObject: BOMObject): Promise<HTMLRender> => {
    const stream = await renderToReadableStream(
      <HTMLBOMDocument bomObject={bomObject} />,
    );

    return new HTMLRender(stream);
  };
}
