import { IfcAPI } from "web-ifc";
import { BOMObject } from "bombastic/model/bom";
import { loadIfcFromFile } from "bombastic/utils";

export const createCore = async () => {
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

  return { ifcApi, modelId, bomObject, exampleBOMHTMLFile };
}
