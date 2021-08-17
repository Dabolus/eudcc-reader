import { FunctionalComponent, h } from 'preact';
import { GreenPassDataOutput } from '../utils/extractor';
import classes from './GreenPassResultsTab.module.scss';

export interface GreenPassResultsTabProps {
  value: GreenPassDataOutput;
}

const GreenPassResultsTab: FunctionalComponent<GreenPassResultsTabProps> = ({
  value: { parsed },
}) => (
  <div className={classes.grid}>
    <label id="name-label">Name</label>
    <span aria-labelledby="name-label">
      {parsed.nam?.fn} {parsed.nam?.gn}
    </span>
    <label id="birth-date-label">Birth date</label>
    <span aria-labelledby="birth-date-label">
      {new Date(parsed.dob || '').toLocaleDateString()}
    </span>
    <strong className={classes.reason}>
      {parsed.v &&
        parsed.v.length > 0 &&
        'This Green Pass has been issued because you have been vaccinated.'}
      {parsed.t &&
        parsed.t.length > 0 &&
        'This Green Pass has been issued because you were tested negatively.'}
      {parsed.t &&
        parsed.t.length > 0 &&
        'This Green Pass has been issued because you got the disease and you recovered.'}
    </strong>
  </div>
);

export default GreenPassResultsTab;
