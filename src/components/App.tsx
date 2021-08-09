import { FunctionalComponent, h } from 'preact';
import { Router, Route } from 'wouter-preact';

import Home from '../routes/Home';
import Reader from '../routes/Reader';

const App: FunctionalComponent = () => {
  return (
    <div>
      <Router base="/green-pass-reader">
        <Route path="/" component={Home} />
        <Route path="/reader" component={Reader} />
      </Router>
    </div>
  );
};

export default App;
