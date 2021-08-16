import {
  h,
  Fragment,
  FunctionalComponent,
  ComponentChild,
  ComponentChildren,
} from 'preact';
import commonClasses from '../common/styles.module.scss';
import classes from './Tabs.module.scss';

export interface Tab {
  id: string;
  title?: string;
  content: ComponentChild | ComponentChildren;
}

export interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange?(newValue: string): void;
}

const Tabs: FunctionalComponent<TabsProps> = ({ tabs, value, onChange }) => (
  <>
    <div role="tablist">
      {tabs.map(({ id, title = id }) => (
        <button
          key={id}
          id={id}
          role="tab"
          aria-selected={value === id ? 'true' : 'false'}
          aria-controls={`${id}-tab`}
          onClick={(): void => onChange?.(id)}
          className={classes.tab}
        >
          {title}
        </button>
      ))}
    </div>
    {tabs.map(({ id, content }) => (
      <div
        key={id}
        tabIndex={0}
        role="tabpanel"
        id={`${id}-tab`}
        aria-labelledby={id}
        hidden={value !== id}
        className={`${commonClasses.card} ${classes.tabContent}`}
      >
        {content}
      </div>
    ))}
  </>
);

export default Tabs;
