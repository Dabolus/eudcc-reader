import { decode as decodeBase45 } from 'base45-ts';
import { inflate } from 'pako';
import { decodeAll as decodeCbor } from 'cbor-web';
import { EUDCC } from '../types/DCC.schema';

export const extractGreenPassData = async (rawQr: string): Promise<EUDCC> => {
  // Strip the HCERT protocol prefix
  const rawContent = rawQr.slice(4);

  // Decode the base45
  const decoded = decodeBase45(rawContent);

  // Inflate the decoded base45 using zlib
  const inflated = inflate(decoded);

  const [
    {
      value: [, , cborData],
    },
  ] = await decodeCbor(inflated);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [greenpassData] = (await decodeCbor(cborData)) as [Map<number, any>];

  return {
    ...greenpassData.get(-260).get(1),
    country: greenpassData.get(1),
    createdAt: greenpassData.get(6),
    expiresAt: greenpassData.get(4),
  };
};
