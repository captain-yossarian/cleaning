import { combineReducers } from 'redux';
import cartReducer from './cart.reducer.js';


const rootReducer=combineReducers({
  navState:cartReducer
});
export default rootReducer;
