import {CHANGE_TABINDEX} from '../constans';
import {menu} from './menu.js';

export const initialState = {
  menu:menu,
  focusExpandedMode: false,
  activeElement: null,
  deep: null,
  tabindex: [0,-1,-1,-1,-1,-1]
  /*
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47
    }
  ]
  */
}
 const cartReducer = function(state=initialState, action) {
   console.log('reducer ',action)
  switch (action.type) {
    case CHANGE_TABINDEX:{
      var lastElement = 6/*magic number*/;
      var {index,direction}=action.payload;
      var tabindex = Array(lastElement).fill(-1);
      tabindex[index] = 0;
      return {
        tabindex:tabindex
      }
    }
    /*
    case CHANGE_TABINDEX: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    */
    default:
      return state;
  }
}
export default cartReducer;
