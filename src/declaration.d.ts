declare module '*.css' {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module 'cbor-web' {
  export * from 'cbor';
}

declare const BarcodeDetector: typeof import('barcode-detector/src/BarcodeDetector').default;
declare type BarcodeDetector = BarcodeDetector;

interface Window {
  BarcodeDetector: BarcodeDetector;
}
