
import {CHANGE_TABINDEX} from '../constans';


export function rovingTabindex(index,direction){
  return{
    type:CHANGE_TABINDEX,
    payload:{index,direction}
  }
}
