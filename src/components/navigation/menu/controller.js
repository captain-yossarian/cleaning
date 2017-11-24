export default class NavigationItem {
  constructor(element) {
    this.element = element;
  }
  setElement(element) {
    this.element = element;
  }
  openSubMenu() {
    setTimeout(() => {
      this.element.nextElementSibling.firstChild.firstChild.focus()
    }, 0)
  }
  nearestUlParent(element, parent = element.parentElement) {
    return element.nodeName == 'UL'
      ? element
      : this.nearestUlParent(element.parentElement)
  }
  rootParent(element, parent = element.parentElement) {
    return parent.getAttribute('deep') == 0
      ? parent
      : this.rootParent(parent)
  }
  escapeMenu() {
    var result = this.nearestUlParent(this.element)
    result.previousElementSibling.focus()
    console.log(this.element)
    //result.children[0].focus()
    /**
    * TODO fix bug, when press ESCAPE, focus Ok but tub index is '-1',must be - 0
    * @type {Object}
    */
  }

  goTo(key) {
    var sides = {
      [35]: 'lastChild',
      [36]: 'firstChild'
    }
    this.nearestUlParent(this.element)[sides[key]].firstChild.focus()
  }

  focusFromSub(deep,code) {
    var element=this.nearestUlParent(this.element).previousElementSibling;
    deep==1?element.parentElement.previousElementSibling.firstChild.focus():element.focus();
  }
  toFirstElementInSubMenu(code){
    var child=[40,13,32].some(el=>el==code)?'firstChild':'lastChild';
    this.element.nextElementSibling[child].firstChild.focus()
  }

  focusTo(direction, toRoot) {
    var side = {
      'right': 'nextElementSibling',
      'left': 'previousElementSibling',
      'same':'parentElement'
    }
    var ref = toRoot ? this.rootParent(this.element) : this.element.parentElement;
    var refSideDirection = ref[side[direction]];
    if(direction =='same'){
      ref.firstChild.focus();
      return;
    }
    var refParentChildren = ref.parentElement.children;
    if (refSideDirection !== null) {
      refSideDirection.firstChild.focus()
    } else {
      refParentChildren[direction == 'right' ? 0 : refParentChildren.length - 1].firstChild.focus()
    }
  }
}
