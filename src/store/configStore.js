import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index.reducer.js';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';



/**
 * to work with IMG loading or ajax requests you need 'redux-thunk'.P.S.=> async actions...
 */

function configureStore() {
let store =process.env.NODE_ENV !== 'production' ?createStore(rootReducer/*, composeWithDevTools(applyMiddleware(logger))*/):createStore(rootReducer)
  return store;
}

export const store = configureStore();
