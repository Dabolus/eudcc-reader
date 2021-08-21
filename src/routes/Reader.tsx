import { FunctionalComponent, h, Fragment } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { Link, Redirect } from 'wouter-preact';
import EUDCC from '../components/EUDCC';
import ArrowBackIcon from '../components/icons/ArrowBack';
import useCamera from '../hooks/useCamera';
import useEUDCC from '../hooks/useEUDCC';
import classes from './Reader.module.scss';
import commonClasses from '../common/styles.module.scss';

const Reader: FunctionalComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { hasGivenConsent, startCamera, stopCamera } = useCamera();
  const { read, output } = useEUDCC();

  useEffect(() => {
    if (output) {
      stopCamera();
    }
  }, [output, stopCamera]);

  useEffect(() => {
    const detectQr = async (): Promise<void> => {
      if (!hasGivenConsent || !videoRef.current) {
        return;
      }

      const { current: video } = videoRef;
      const stream = await startCamera({ facingMode: 'environment' });
      video.srcObject = stream;

      read(video);
    };

    detectQr();
  }, [hasGivenConsent, read, startCamera]);

  if (hasGivenConsent === false) {
    return <Redirect to="/" />;
  }

  if (!hasGivenConsent) {
    return <>Loading...</>;
  }

  return output ? (
    <EUDCC value={output} />
  ) : (
    <>
      <header className={commonClasses.header}>
        <Link href="/">
          <a>
            <ArrowBackIcon />
          </a>
        </Link>
        <h1>Back to home page</h1>
      </header>
      <main className={classes.camera}>
        {/* Overlay */}
        <div />
        {/* Actual camera */}
        <video ref={videoRef} autoPlay muted playsInline />
      </main>
    </>
  );
};

export default Reader;
