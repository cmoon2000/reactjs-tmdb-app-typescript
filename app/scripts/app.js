"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
require("whatwg-fetch");
const es6_promise_1 = require("es6-promise");
es6_promise_1.polyfill();
const app_main_1 = require("./components/app-main");
window.React = React;
ReactDOM.render(React.createElement(app_main_1.default, null), document.getElementById('app'));
