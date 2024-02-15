import { IfcAPI } from "web-ifc";
import { BOMObject } from "bombastic/model/bom";
import { loadIfcFromFile } from "bombastic/utils";
import { type ExportFormat, createRenderer } from "bombastic/renderer";

export class BOMGenerator {
  private readonly ifcApi = new IfcAPI();

  public generate = async (
    ifcFilePath: string | URL,
    exportFormat: ExportFormat,
    reportFilePath: string,
  ) => {
    if (this.ifcApi.wasmModule === undefined) {
      await this.ifcApi.Init();
    }

    const modelId = await loadIfcFromFile(ifcFilePath, this.ifcApi);
    const bomObject = new BOMObject(modelId, this.ifcApi);
    const render = await createRenderer(exportFormat).render(bomObject);

    render.toFile(reportFilePath);
  };
}
