import { FunctionalComponent, h } from 'preact';
import { GreenPassDataOutput } from '../utils/extractor';
import { stringify } from '../utils/helpers';
import classes from './GreenPassRawTab.module.scss';

export interface GreenPassRawTabProps {
  value: GreenPassDataOutput;
}

const GreenPassRawTab: FunctionalComponent<GreenPassRawTabProps> = ({
  value: { raw, base45, compressed, cose, cbor, content },
}) => (
  <div className={classes.rawData}>
    <label id="raw-label">Raw</label>
    <pre aria-labelledby="raw-label">{raw}</pre>
    <label id="base45-label">Base45</label>
    <pre aria-labelledby="base45-label">{base45}</pre>
    <label id="compressed-label">Compressed</label>
    <pre aria-labelledby="compressed-label">{stringify(compressed)}</pre>
    <label id="cose-label">COSE</label>
    <pre aria-labelledby="cose-label">{stringify(cose)}</pre>
    <label id="cbor-label">CBOR</label>
    <pre aria-labelledby="cbor-label">{stringify(cbor)}</pre>
    <label id="content-label">Content</label>
    <pre aria-labelledby="content-label">{stringify(content)}</pre>
  </div>
);

export default GreenPassRawTab;
