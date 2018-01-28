import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import leaderboardApp from './reducers';

fetch('/api/state', { accept: 'application/json' } as RequestInit).then((res) => {
  return res.json();
}).then((data) => {
  const store = createStore(leaderboardApp, data);

  ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  );

  registerServiceWorker();
});
