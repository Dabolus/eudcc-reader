// TODO: lazy load polyfill to improve browser support
const detectorPromise = Promise.resolve(
  new BarcodeDetector({ formats: ['qr_code'] }),
);

export const detectQrCode = async (
  video: HTMLVideoElement,
): Promise<string> => {
  const detector = await detectorPromise;
  const results = await detector.detect(video);

  if (results.length < 1) {
    return detectQrCode(video);
  }

  const result = results.find(({ format }) => format === 'qr_code');

  if (!result) {
    return detectQrCode(video);
  }

  return result.rawValue as string;
};
