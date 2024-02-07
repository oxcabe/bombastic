export interface Material {
  name: string;
}

export interface Object {
  name: string;
  type: string;
  ifcType: string;
  globalId: string;
  materials: Material[];
}
