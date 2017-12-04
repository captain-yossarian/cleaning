import {
  CHANGE_TABINDEX,
  SWITCH_FOCUS_EXPANDED_MODE,
  ASSIGN_ELEMENT,
  PREVIOUS_ELEMENT
} from '../constans';
import {menu,reset} from './menu.js';





function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (o.hasOwnProperty(prop) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
};


// /https://codepen.io/SerhiiBIlyk/pen/eeLObL?editors=0012

export const initialState = {
  focusExpandedMode: false,
  activeElement: null,
  deep: null,
  current:null,
  tree:menu,
  previous:null
}

const navigationReducer = function(state = initialState, action) {
  var freeze = deepFreeze(state);
  switch (action.type) {
    case PREVIOUS_ELEMENT:
    var {prevElement}=action.payload;
    return {
      ...state,
      previous:prevElement
    }
    break;
    case CHANGE_TABINDEX:
      {
        var {index} = action.payload;
        return {
          ...state,
          tree:{
            ...reset,
            [index]:{
              ...state.tree[index],
              tabindex:0
            }
          }
        }
      }
      break;
      case SWITCH_FOCUS_EXPANDED_MODE:{
        if(action.payload.turn=='on'){
          return {
            ...state,
            focusExpandedMode:true
          }
        }
        else{
          if(state.focusExpandedMode){
            return {
              ...state,
              focusExpandedMode:false
            }
          }else{
            return state;
          }
        }
      }
      break;
      case ASSIGN_ELEMENT:{
        var {deep}=action.payload;
        console.log('action',action.payload)
        return {
          ...state,
          deep:deep
        }
      }
      break;
    default:
      return state;
      break;
  }
}
export default navigationReducer;
