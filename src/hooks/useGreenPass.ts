import { useCallback, useState } from 'preact/hooks';
import { detectQrCode } from '../utils/detector';
import { extractGreenPassData, GreenPassDataOutput } from '../utils/extractor';

export interface UseGreenPassValue {
  read(video: HTMLVideoElement): Promise<GreenPassDataOutput>;
  output: GreenPassDataOutput | undefined;
}

const waitForVideoStarted = (
  video: HTMLVideoElement,
  timeout = 5000,
): Promise<HTMLVideoElement> =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Timeout'));
    }, timeout);

    const callback = (): void => {
      if (video.currentTime > 0) {
        clearTimeout(timeoutId);
        requestAnimationFrame(() => resolve(video));
      } else {
        requestAnimationFrame(callback);
      }
    };
    requestAnimationFrame(callback);
  });

const useGreenPass = (): UseGreenPassValue => {
  const [output, setOutput] = useState<GreenPassDataOutput | undefined>(
    undefined,
  );

  const read = useCallback<UseGreenPassValue['read']>(async video => {
    await waitForVideoStarted(video);
    const qrContent = await detectQrCode(video);
    const greenPassDataOutput = await extractGreenPassData(qrContent);

    setOutput(greenPassDataOutput);

    return greenPassDataOutput;
  }, []);

  return { read, output };
};

export default useGreenPass;
