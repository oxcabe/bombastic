import { IfcAPI } from "web-ifc";

export const loadIfcFromFile = async (
  ifcFilePath: string | URL,
  ifcApi: IfcAPI,
): Promise<number> => {
  const ifcFile = Bun.file(ifcFilePath);

  const ifcData = await ifcFile.arrayBuffer().then((data) => {
    return new Uint8Array(data);
  });

  const modelId = ifcApi.OpenModel(ifcData);
  return modelId;
};
