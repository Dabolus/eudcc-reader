import { FunctionalComponent, h, Fragment } from 'preact';
import {
  eudccStatusToMessageMap,
  GreenPassDataOutput,
  isValidEUDCC,
} from '../utils/extractor';
import classes from './GreenPassResultsTab.module.scss';

export interface GreenPassResultsTabProps {
  value: GreenPassDataOutput;
}

const GreenPassResultsTab: FunctionalComponent<GreenPassResultsTabProps> = ({
  value: { parsed },
}) => (
  <div className={classes.grid}>
    {isValidEUDCC(parsed) && (
      <>
        <label id="name-label">Name</label>
        <span aria-labelledby="name-label">
          {parsed.data.name?.surname} {parsed.data.name?.forename}
        </span>
        <label id="birth-date-label">Birth date</label>
        <span aria-labelledby="birth-date-label">
          {parsed.data.birthDate?.toLocaleDateString()}
        </span>
      </>
    )}
    <strong className={classes.reason}>
      {eudccStatusToMessageMap[parsed.status]}
    </strong>
  </div>
);

export default GreenPassResultsTab;
