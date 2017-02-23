import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'whatwg-fetch';
import {polyfill} from 'es6-promise';
polyfill();
import App from './components/app-main';

(window as any).React = React;

ReactDOM.render( <App />,  document.getElementById('app'));