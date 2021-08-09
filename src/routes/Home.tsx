import { FunctionalComponent, h, Fragment } from 'preact';
import { useLocation } from 'wouter-preact';
import QRCodeIcon from '../components/icons/QRCode';
import useCamera from '../hooks/useCamera';
import classes from './Home.module.scss';
import commonClasses from '../common/styles.module.scss';

const Home: FunctionalComponent = () => {
  const [, setLocation] = useLocation();
  const { startCamera } = useCamera();

  const startReader = async (): Promise<void> => {
    await startCamera({ facingMode: 'environment' });
    setLocation('/reader');
  };

  return (
    <>
      <header className={commonClasses.header}>
        <h1>Green Pass Reader</h1>
      </header>
      <main className={classes.content}>
        <section className={commonClasses.card}>
          <h2>
            Read a <strong>Green Pass</strong>
          </h2>
          <button onClick={startReader} className={classes.startReaderButton}>
            <QRCodeIcon />
            Scan a QR Code
          </button>
        </section>
      </main>
    </>
  );
};

export default Home;
