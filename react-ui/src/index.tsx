import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import leaderboardApp from './reducers';

const store = createStore(
  leaderboardApp,
  applyMiddleware(thunkMiddleware)
);
const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(<Provider store={store}><App /></Provider>, root);

registerServiceWorker();
