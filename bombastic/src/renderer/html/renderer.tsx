import { renderToReadableStream } from "react-dom/server";
import { BOMObject } from "bombastic/model/bom";
import { HTMLBOMDocument } from "bombastic/renderer/html/template";
import type { ExportFormat } from "bombastic/renderer";

export class HTMLRenderer {
  public readonly type: ExportFormat = "html";

  public toReadableStream = async (
    bomObject: BOMObject,
  ): Promise<ReadableStream> => {
    const stream = await renderToReadableStream(
      <HTMLBOMDocument bomObject={bomObject} />,
    );

    return stream;
  };
}
