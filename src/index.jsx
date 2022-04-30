// @ts-check

import React from 'react';
import App from './components/App.jsx';
import ReactDom from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';

const root = document.querySelector('#chat');

ReactDom.render(
    <Router>
        <App/>
    </Router>, 
root)
