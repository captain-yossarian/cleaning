import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index.reducer.js';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * to work with IMG loading or ajax requests you need 'redux-thunk'.P.S.=> async actions...
 */

function configureStore() {

  var store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)))
  return store;
}

export const store = configureStore();
