// @ts-nocheck

import React from 'react';
import { Provider as Rollbar, ErrorBoundary } from '@rollbar/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App.jsx';

import store from './slices';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

const rollbarConfig = {
  accessToken: 'bc120308c8f84615a5ba5d4b0098d5ba',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

function Dom({ socket }) {
  return (
    <Rollbar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <Router>
            <App socket={socket} />
          </Router>
        </Provider>
      </ErrorBoundary>
    </Rollbar>
  );
}

export default async (socket) => <Dom socket={socket} />;
