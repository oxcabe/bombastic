import { renderToReadableStream } from "react-dom/server";
import { BOMObject } from "bombastic/model/bom";
import { BOMDocument } from "./template/document";

export class HTMLRenderer {
  public toReadableStream = async (bomObject: BOMObject) => {
    const stream = await renderToReadableStream(
      <BOMDocument bomObject={bomObject} />,
    );
  };
}
