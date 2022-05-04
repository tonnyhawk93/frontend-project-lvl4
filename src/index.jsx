// @ts-nocheck

import React from 'react';
import App from './components/App.jsx';
import ReactDom from 'react-dom';
import { Provider as Rollbar, ErrorBoundary } from '@rollbar/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './slices'
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

const root = document.querySelector('#chat');
const rollbarConfig = {
    accessToken: "bc120308c8f84615a5ba5d4b0098d5ba",
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
        environment: "production"
    }
};

ReactDom.render(
    <Rollbar config={rollbarConfig}>
        <ErrorBoundary>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </ErrorBoundary>
    </Rollbar>,
    root)
