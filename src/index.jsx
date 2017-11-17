import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Header from './components/header/header.jsx';
import Main from './routes.jsx';

import {createStore} from 'redux';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import rootReducer from './reducers/index.reducer.js';
import {store} from './store/configStore.js';



function root(nodeID) {
  const element = document.createElement('div');
  element.id = nodeID;
  document.body.appendChild(element);
  return element;
};
var element = root('root');




ReactDOM.render((
  <Provider store={store}>
  <Router>
    <Main/>
  </Router>
</Provider>
), element);
