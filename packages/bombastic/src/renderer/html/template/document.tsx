import type { BOMObject } from "bombastic/model/bom";
import type { Object } from "bombastic/model/properties";
import type { ReactNode } from "react";

interface HTMLBOMDocumentProps {
  bomObject: BOMObject;
}

interface HTMLBOMHeadProps {
  title: string;
}

interface HTMLBOMBodyProps extends HTMLBOMDocumentProps {}

export const HTMLBOMDocument = ({ bomObject }: HTMLBOMDocumentProps) => {
  return (
    <html>
      <HTMLBOMHead title={bomObject.projectName} />
      <HTMLBOMBody bomObject={bomObject} />
    </html>
  );
};

export const HTMLBOMHead = ({ title }: HTMLBOMHeadProps) => {
  return (
    <head>
      <title>{`BOM Report - ${title}`}</title>
    </head>
  );
};

export const HTMLBOMBody = ({ bomObject }: HTMLBOMBodyProps) => {
  const title = bomObject.projectName;
  const objects = bomObject.objects;

  return (
    <body>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        {Object.keys(objects).map((key) => {
          const object = objects[Number(key)];
          return (
            <section key={key}>
              <h3>{object.name}</h3>
              <p>Type: {object.type}</p>
              <p>IFC Type: {object.ifcType}</p>
              <p>Global ID: {object.globalId}</p>
              <section>
                <ul>
                  {object.materials.map((material, index) => {
                    return <li key={index}>{material.name}</li>;
                  })}
                </ul>
              </section>
            </section>
          );
        })}
      </main>
      <footer>End of document.</footer>
    </body>
  );
};
