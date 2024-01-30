import { IfcAPI } from "web-ifc";

export class BOMGenerator {
  private readonly ifcApi: IfcAPI;

  constructor() {
    this.ifcApi = new IfcAPI();
  }

  public generate = async (ifcFilePath: string | URL) => {
    if (this.ifcApi.wasmModule === undefined) {
      await this.ifcApi.Init();
    }

    const modelId = await this.loadIfcFromFile(ifcFilePath);
  };

  private loadIfcFromFile = async (
    ifcFilePath: string | URL,
  ): Promise<number> => {
    const ifcFile = Bun.file(ifcFilePath);

    const ifcData = await ifcFile.arrayBuffer().then((data) => {
      return new Uint8Array(data);
    });

    const modelId = this.ifcApi.OpenModel(ifcData);
    return modelId;
  };
}
