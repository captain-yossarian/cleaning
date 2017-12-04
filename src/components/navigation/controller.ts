export default class NavigationItem {
  element: any/*HTMLAnchorElement*/;
  constructor(element: any) {
    this.element = element as any;
  }
  setElement(element: any) {
    this.element = element;
  }
  unbindToGarbageCollector(){
    this.element=null;
  }

  openSubMenu(): void {
    setTimeout(() => {
      this.element.nextElementSibling.firstChild.firstChild.focus()
    }, 0)
  }
  nearestUlParent(element: any, parent = element.parentElement): any {
    return element.nodeName == 'UL'
      ? element
      : this.nearestUlParent(element.parentElement)
  }
  rootParent(element: any, parent = element.parentElement): any {
    return parent.getAttribute('deep') === '0'
      ? parent
      : this.rootParent(parent)
  }
  goTo(key: number): void {
    var sides: any = {
      [35]: 'lastChild',
      [36]: 'firstChild'
    }
    this.nearestUlParent(this.element)[sides[key]].firstChild.focus()
  }

  focusFromSub(deep: number, code: number) {
    var element = this.nearestUlParent(this.element).previousElementSibling;
    deep == 1 ? element.parentElement.previousElementSibling.firstChild.focus() : element.focus();
  }
  toFirstElementInSubMenu(code: number) {
    var child: string = [40, 13, 32].some(el => el == code) ? 'firstChild' : 'lastChild';
    this.element.nextElementSibling[child].firstChild.focus()
  }

  focusTo(direction: string, toRoot: string) {
    var side: any = {
      'right': 'nextElementSibling',
      'left': 'previousElementSibling',
      'same': 'parentElement'
    }
    var ref: any = toRoot ? this.rootParent(this.element) : this.element.parentElement;
    var refSideDirection: any = ref[side[direction]];
    if (direction == 'same') {
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
