import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import GreenPassResultsTab from '../routes/GreenPassResultsTab';
import GreenPassAdvancedTab from '../routes/GreenPassAdvancedTab';
import GreenPassRawTab from '../routes/GreenPassRawTab';
import {
  eudccStatusToMessageMap,
  GreenPassDataOutput,
  isValidEUDCC,
} from '../utils/extractor';
import classes from './GreenPass.module.scss';
import commonClasses from '../common/styles.module.scss';
import Tabs from './Tabs';

export interface GreenPassProps {
  value: GreenPassDataOutput;
}

const GreenPass: FunctionalComponent<GreenPassProps> = ({ value }) => {
  const [currentTab, setCurrentTab] = useState('results');

  return (
    <main className={classes.container}>
      {isValidEUDCC(value.parsed) ? (
        <Tabs
          tabs={[
            {
              id: 'results',
              title: 'Results',
              content: <GreenPassResultsTab value={value.parsed} />,
            },
            {
              id: 'advanced',
              title: 'Advanced',
              content: <GreenPassAdvancedTab value={value.parsed} />,
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
      ) : (
        <div className={`${commonClasses.card} ${classes.spaced}`}>
          <strong>{eudccStatusToMessageMap[value.parsed.status]}</strong>
        </div>
      )}
    </main>
  );
};

export default GreenPass;
