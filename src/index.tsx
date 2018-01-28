import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import leaderboardApp from './reducers';

const data = {
  regions: {
    '04jp51zq': { id: '04jp51zq', name: 'Wellington' },
    'ltpkbcoe': { id: 'ltpkbcoe', name: 'Auckland' },
    'cmh2h4r8': { id: 'cmh2h4r8', name: 'Napier' },
    'ahqq2j94': { id: 'ahqq2j94', name: 'London' },
    'txlcs06u': { id: 'txlcs06u', name: 'World' }
  },
  results: [
    { region: 'ltpkbcoe', winner: 0, date: '2018-01-27', score: 0},
    { region: 'txlcs06u', winner: 3, date: '2018-01-23', score: 45}
  ]
};
const store = createStore(leaderboardApp, data);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
