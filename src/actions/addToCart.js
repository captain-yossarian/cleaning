
import {
  CHANGE_TABINDEX,
  SWITCH_FOCUS_EXPANDED_MODE,
  ASSIGN_ELEMENT
} from '../constans';


export function rovingTabindex(index,coordinates){
  return{
    type:CHANGE_TABINDEX,
    payload:{index,coordinates}
  }
}
export function switchFocusExpanded(turn){
  return{
    type:SWITCH_FOCUS_EXPANDED_MODE,
    payload:{turn}
  }
}
export function assignElement(deep,coordinates){
  return{
    type:ASSIGN_ELEMENT,
    payload:{deep,coordinates}
  }
}
