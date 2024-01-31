import { IfcAPI } from "web-ifc";
import { BOMObject } from "./model/bom";
import { loadIfcFromFile } from "./utils";

export class BOMGenerator {
  private readonly ifcApi = new IfcAPI();

  public generate = async (ifcFilePath: string | URL) => {
    if (this.ifcApi.wasmModule === undefined) {
      await this.ifcApi.Init();
    }

    const modelId = await loadIfcFromFile(ifcFilePath, this.ifcApi);
    const bomObject = new BOMObject(modelId, this.ifcApi);
  };
}
