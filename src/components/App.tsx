import { FunctionalComponent, h } from 'preact';
import { Route } from 'wouter-preact';

import Home from '../routes/Home';
import Reader from '../routes/Reader';

const App: FunctionalComponent = () => {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/reader" component={Reader} />
    </div>
  );
};

export default App;
