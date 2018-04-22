import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import leaderboardApp from './reducers';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: '/graphql' });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const store = createStore(
  leaderboardApp,
  applyMiddleware(thunkMiddleware)
);
const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  root);

registerServiceWorker();
