import type { BOMObject } from "bombastic/model/bom";

interface BOMDocumentProps {
  bomObject: BOMObject;
}

export const BOMDocument = ({ bomObject }: BOMDocumentProps) => {
  return (
    <html>
      <BOMHead />
      <BOMBody />
    </html>
  );
};

const BOMHead = () => {
  return <head></head>;
};

const BOMBody = () => {
  return <body></body>;
};
