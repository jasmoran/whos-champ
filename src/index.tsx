import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import leaderboardApp from './reducers';

function idMap(arr: any[]): any {
  var obj = {};
  arr.forEach((it: any) => obj[it._id] = it);
  return obj;
}

(async function() {
  const res = await fetch('/api/state', { accept: 'application/json' } as RequestInit);
  const rawData = await res.json();
  const data = {
    regions: idMap(rawData.regions),
    users: idMap(rawData.users),
    results: idMap(rawData.results)
  };

  const store = createStore(leaderboardApp, data);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );

  registerServiceWorker();
})();
