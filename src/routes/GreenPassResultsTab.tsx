import { FunctionalComponent, h } from 'preact';
import { EUDCC } from '../types/DCC.schema';
import classes from './GreenPassResultsTab.module.scss';

export interface GreenPassResultsTabProps {
  value: EUDCC;
}

const GreenPassResultsTab: FunctionalComponent<GreenPassResultsTabProps> = ({
  value,
}) => (
  <div className={classes.grid}>
    <label id="name-label">Name</label>
    <span aria-labelledby="name-label">
      {value.nam?.fn} {value.nam?.gn}
    </span>
    <label id="birth-date-label">Birth date</label>
    <span aria-labelledby="birth-date-label">
      {new Date(value.dob || '').toLocaleDateString()}
    </span>
    <strong className={classes.reason}>
      {value.v &&
        value.v.length > 0 &&
        'This Green Pass has been issued because you have been vaccinated.'}
      {value.t &&
        value.t.length > 0 &&
        'This Green Pass has been issued because you were tested negatively.'}
      {value.t &&
        value.t.length > 0 &&
        'This Green Pass has been issued because you got the disease and you recovered.'}
    </strong>
  </div>
);

export default GreenPassResultsTab;
