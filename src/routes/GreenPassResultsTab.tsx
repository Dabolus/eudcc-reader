import { FunctionalComponent, h, Fragment } from 'preact';
import { EUDCCStatus } from '../types/DCC.schema';
import { GreenPassDataOutput, isValidEUDCC } from '../utils/extractor';
import classes from './GreenPassResultsTab.module.scss';

export interface GreenPassResultsTabProps {
  value: GreenPassDataOutput;
}

const statusToMessageMap: Record<EUDCCStatus, string> = {
  [EUDCCStatus.NOT_VALID]: 'Invalid certificate',
  [EUDCCStatus.NOT_VALID_YET]: 'Certificate not valid yet',
  [EUDCCStatus.VALID]: 'Certificate valid in Europe',
  [EUDCCStatus.PARTIALLY_VALID]: 'Certificate valid in Italy',
  [EUDCCStatus.NOT_EUDCC]: 'The QR code is not an EUDCC',
};

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
      {statusToMessageMap[parsed.status]}
    </strong>
  </div>
);

export default GreenPassResultsTab;
