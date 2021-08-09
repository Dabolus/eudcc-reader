import { useCallback, useState } from 'preact/hooks';
import { EUDCC } from '../types/DCC.schema';
import { detectQrCode } from '../utils/detector';
import { extractGreenPassData } from '../utils/extractor';

export interface UseGreenPassValue {
  read(video: HTMLVideoElement): Promise<EUDCC>;
  data: EUDCC | undefined;
}

const waitForVideoMetadataLoaded = (
  video: HTMLVideoElement,
): Promise<HTMLVideoElement> =>
  new Promise(resolve => {
    if (video.readyState === video.HAVE_METADATA) {
      return resolve(video);
    }

    video.addEventListener('loadedmetadata', () => resolve(video));
  });

const useGreenPass = (): UseGreenPassValue => {
  const [data, setData] = useState<EUDCC | undefined>(undefined);

  const read = useCallback<UseGreenPassValue['read']>(async video => {
    await waitForVideoMetadataLoaded(video);
    const qrContent = await detectQrCode(video);
    const greenPassData = await extractGreenPassData(qrContent);

    setData(greenPassData);

    return greenPassData;
  }, []);

  return { read, data };
};

export default useGreenPass;
