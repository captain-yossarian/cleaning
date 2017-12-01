
import {
  CHANGE_TABINDEX,
  SWITCH_FOCUS_EXPANDED_MODE,
  ASSIGN_ELEMENT,
  PREVIOUS_ELEMENT
} from '../constans';

export function previousElement(prevElement){
  return{
    type:PREVIOUS_ELEMENT,
    payload:{prevElement}
  }
}
export function rovingTabindex(index){
  return{
    type:CHANGE_TABINDEX,
    payload:{index}
  }
}
export function switchFocusExpanded(turn){
  return{
    type:SWITCH_FOCUS_EXPANDED_MODE,
    payload:{turn}
  }
}
export function assignElement(deep,index){
  return{
    type:ASSIGN_ELEMENT,
    payload:{deep,index}
  }
}
