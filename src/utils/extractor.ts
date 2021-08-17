import { decode as decodeBase45 } from 'base45-ts';
import { inflate } from 'pako';
import { decodeAll as decodeCbor } from 'cbor-web';
import { EUDCC, EUDCCData } from '../types/DCC.schema';

export interface GreenPassDataOutput {
  raw: string;
  base45: string;
  compressed: Uint8Array;
  cose: Uint8Array;
  cbor: Uint8Array;
  content: Map<number, string | number | Map<number, EUDCCData>>;
  parsed: EUDCC;
}

export const extractGreenPassData = async (
  raw: string,
): Promise<GreenPassDataOutput> => {
  // Strip the HCERT protocol prefix
  const base45 = raw.slice(4);

  // Decode the base45
  const compressed = decodeBase45(base45);

  // Inflate the compressed base45 using zlib
  const cose = inflate(compressed);

  const [
    {
      value: [, , cbor],
    },
  ] = await decodeCbor(cose);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content] = (await decodeCbor(cbor)) as [
    Map<number, string | number | Map<number, EUDCCData>>,
  ];
  const parsed: EUDCC = {
    ...(content.get(-260) as Map<number, EUDCCData>).get(1),
    country: content.get(1) as string,
    createdAt: content.get(6) as number,
    expiresAt: content.get(4) as number,
  };

  return {
    raw,
    base45,
    compressed,
    cose,
    cbor,
    content,
    parsed,
  };
};
