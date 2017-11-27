import {CHANGE_TABINDEX, SET_TO_ACTIVE} from '../constans';
import {menu} from './menu.js';
import {fromJS} from 'immutable';

var freeze=fromJS(menu);
console.log('freeze',freeze)
console.log('menu', menu)
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
  var lastElement = 6/*magic number*/;
  var tmpMenu = [...menu];
  var zeroIndex = tmpMenu.findIndex(el => {
    return el.tabindex == 0
  });
  tmpMenu[zeroIndex].tabindex = -1;
  tmpMenu[index].tabindex = 0;
  return tmpMenu;
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
const cartReducer = function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TABINDEX:
      {
        var {index} = action.payload;
        var newMenu = changeTabIndex(index, state.menu);
        return {menu: newMenu}
      }
      break;
    case SET_TO_ACTIVE:
      {
        var newMenu = [...menu];
        var currElement = findBy(newMenu, action.payload.coordinates);
        console.log('currElement', currElement)
        return {menu: newMenu,current: action.payload.coordinates}
      }

    default:
      return state;
  }
}
export default cartReducer;
