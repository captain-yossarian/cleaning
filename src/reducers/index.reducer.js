import { combineReducers } from 'redux';
import navigationReducer from './navigation.reducer.js';


const rootReducer=combineReducers({
  navState:navigationReducer
});
export default rootReducer;
