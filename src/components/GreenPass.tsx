import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import GreenPassResultsTab from '../routes/GreenPassResultsTab';
import GreenPassRawTab from '../routes/GreenPassRawTab';
import { GreenPassDataOutput } from '../utils/extractor';
import classes from './GreenPass.module.scss';
import Tabs from './Tabs';

export interface GreenPassProps {
  value: GreenPassDataOutput;
}

const GreenPass: FunctionalComponent<GreenPassProps> = ({ value }) => {
  const [currentTab, setCurrentTab] = useState('results');

  return (
    <main className={classes.container}>
      <Tabs
        tabs={[
          {
            id: 'results',
            title: 'Results',
            content: <GreenPassResultsTab value={value} />,
          },
          {
            id: 'raw',
            title: 'Raw',
            content: <GreenPassRawTab value={value} />,
          },
        ]}
        value={currentTab}
        onChange={setCurrentTab}
      />
    </main>
  );
};

export default GreenPass;
