import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { EUDCC } from '../types/DCC.schema';
import GreenPassResultsTab from '../routes/GreenPassResultsTab';
import classes from './GreenPass.module.scss';
import Tabs from './Tabs';

export interface GreenPassProps {
  value: EUDCC;
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
        ]}
        value={currentTab}
        onChange={setCurrentTab}
      />
    </main>
  );
};

export default GreenPass;
