import {
  CHANGE_TABINDEX,
  SWITCH_FOCUS_EXPANDED_MODE,
  ASSIGN_ELEMENT,
  PREVIOUS_ELEMENT
} from '../constans';
import {menu,reset} from './menu.js';
import { Map } from 'immutable';


function  zero(arg){
  for(var prop in arg){
  console.log('zero:',arg[prop]);
  }

}
zero(menu)


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

var changeTabIndex = function(index, menu) {
  var lastElement = menu.length;
  var zeroIndex = menu.findIndex(el => {
    return el.tabindex == 0
  });
  menu[zeroIndex].tabindex = -1;
  menu[index].tabindex = 0;
  return menu;
}

function findBy(menu, coordinates) {
  if (coordinates.length > 1) {
    var [index, ...rest] = coordinates;

    return findBy(menu[index].sub, rest)
  } else if (coordinates.length == 1) {
    var index = coordinates[0];
    return menu[index]
  }
  return menu[index]
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
