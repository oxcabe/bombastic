import { IfcAPI } from "web-ifc";

/**
 * Loads an IFC file given its path.
 * @param ifcFilePath Path of the IFC file.
 * @param ifcApi web-ifc IfcAPI object.
 * @returns A promise with the model ID of the file.
 */
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
