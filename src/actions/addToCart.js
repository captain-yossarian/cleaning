
import {CHANGE_TABINDEX,SET_TO_ACTIVE} from '../constans';


export function rovingTabindex(index){
  return{
    type:CHANGE_TABINDEX,
    payload:{index}
  }
}
export function setToActiveElement(coordinates){
  console.log("ACTION",coordinates)
  return{
    type:SET_TO_ACTIVE,
    payload:{coordinates}
  }
}
