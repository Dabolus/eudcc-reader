import { useCallback, useState } from 'preact/hooks';
import { detectQrCode } from '../utils/detector';
import { extractGreenPassData, GreenPassDataOutput } from '../utils/extractor';

export interface UseGreenPassValue {
  read(video: HTMLVideoElement): Promise<GreenPassDataOutput>;
  output: GreenPassDataOutput | undefined;
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
  const [output, setOutput] = useState<GreenPassDataOutput | undefined>(
    undefined,
  );

  const read = useCallback<UseGreenPassValue['read']>(async video => {
    await waitForVideoMetadataLoaded(video);
    const qrContent = await detectQrCode(video);
    const greenPassDataOutput = await extractGreenPassData(qrContent);

    setOutput(greenPassDataOutput);

    return greenPassDataOutput;
  }, []);

  return { read, output };
};

export default useGreenPass;
