
import {CHANGE_TABINDEX,SET_TO_ACTIVE} from '../constans';


export function rovingTabindex(index,coordinates){
  return{
    type:CHANGE_TABINDEX,
    payload:{index,coordinates}
  }
}
