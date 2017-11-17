
import {ADD_TO_CART} from '../constans';


export function addToCart(product,quantity,unitCost){
  return{
    type:ADD_TO_CART,
    payload:{product,quantity,unitCost}
  }
}
