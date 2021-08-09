import { FunctionalComponent, h, Fragment } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { Link, Redirect } from 'wouter-preact';
import GreenPass from '../components/GreenPass';
import ArrowBackIcon from '../components/icons/ArrowBack';
import useCamera from '../hooks/useCamera';
import useGreenPass from '../hooks/useGreenPass';
import classes from './Reader.module.scss';
import commonClasses from '../common/styles.module.scss';

const Reader: FunctionalComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { hasGivenConsent, startCamera, stopCamera } = useCamera();
  const { read, data } = useGreenPass();

  useEffect(() => {
    if (data) {
      stopCamera();
    }
  }, [data, stopCamera]);

  useEffect(() => {
    const detectQr = async (): Promise<void> => {
      if (!hasGivenConsent || !videoRef.current) {
        return;
      }

      const { current: video } = videoRef;
      const stream = await startCamera();
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

  return data ? (
    <GreenPass value={data} />
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
        <video ref={videoRef} autoPlay />
      </main>
    </>
  );
};

export default Reader;
