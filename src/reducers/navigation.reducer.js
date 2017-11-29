import {CHANGE_TABINDEX} from '../constans';
import {menu} from './menu.js';

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
  menu: menu,
  focusExpandedMode: false,
  activeElement: null,
  deep: null,
  previous: null,
  current: null
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
    var [index,
      ...rest] = coordinates;
    return findBy(menu[index].sub, rest)
  } else if (coordinates.length == 1) {
    var index = coordinates[0];
    return menu[index]
  }
  return menu[index]
}
const navigationReducer = function(state = initialState, action) {
  var freeze = deepFreeze(state);
  var frozen = JSON.stringify(state);
  var mutableState = JSON.parse(frozen);

  switch (action.type) {
    case CHANGE_TABINDEX:
      {
        var {index} = action.payload;
        var newMenu = changeTabIndex(index, mutableState.menu);
      //  var currElement = findBy(mutableState.menu, action.payload.coordinates);
        return {
          menu: newMenu,
          current: action.payload.coordinates
        }
      }
      break;

    default:
      return state;
  }
}
export default navigationReducer;
