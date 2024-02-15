import type { BunFile } from "bun";
import { renderToReadableStream } from "react-dom/server";
import { BOMObject } from "bombastic/model/bom";
import { HTMLBOMDocument } from "bombastic/renderer/html/template";
import type { ExportFormat, Renderer, Render } from "bombastic/renderer";

export class HTMLRender implements Render {
  constructor(readonly stream: ReadableStream) {}

  public toString = async (): Promise<string> => {
    return await Bun.readableStreamToText(this.stream);
  };

  public toFile = async (filePath: string) => {
    const response = new Response(this.stream);
    await Bun.write(filePath, response);
  };
}

export class HTMLRenderer implements Renderer {
  public readonly type: ExportFormat = "html";

  public render = async (bomObject: BOMObject): Promise<HTMLRender> => {
    const stream = await renderToReadableStream(
      <HTMLBOMDocument bomObject={bomObject} />,
    );

    return new HTMLRender(stream);
  };
}
