import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

class NavigationItem {
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
 escapeMenu(){
   var result=this.rootParent(this.element)
  result.children[0].focus()
   console.log(result)
   /**
    * TODO fix bug, when press ESCAPE, focus Ok but tub index is '-1',must be - 0
    * @type {Object}
    */
 }

  goTo(key) {
    var sides={
      [35]:'lastChild',
      [36]:'firstChild'
    }
    this.nearestUlParent(this.element)[sides[key]].firstChild.focus()
  }

  focusFromSub(deep) {
    if (deep == 1) {
        this.nearestUlParent(this.element).previousElementSibling.parentElement.previousElementSibling.children[0].focus()
    } else {
        this.nearestUlParent(this.element).previousElementSibling.focus()
    }
  }

  focusTo(direction,toRoot) {
    var side = {
      'right': 'nextElementSibling',
      'left': 'previousElementSibling'
    }
    var ref =toRoot ? this.rootParent(this.element): this.element.parentElement;
    var refSideDirection = ref[side[direction]];
    var refParentChildren = ref.parentElement.children;
    if (refSideDirection !== null) {
      refSideDirection.firstChild.focus()
    } else {
      refParentChildren[direction == 'right'? 0 : refParentChildren.length - 1].firstChild.focus()
    }
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeElement: null,
      deep: null,
      force: false
    }
  }

  setElement(element, deep) {
    this.setState({activeElement: new NavigationItem(element), deep: deep})
  }
  keyHandler(e) {
    if (e.keyCode == 35 || e.keyCode == 36) {
      e.preventDefault();
      this.state.activeElement.goTo(e.keyCode)

    } else if (this.state.deep == 0) {
      /**
       * In this case we move on the top (root) level navigation
       */
      switch (e.keyCode) {
        case 13: //Enter
        case 32: //Space
        case 40://Down
        case 38://Up
          e.preventDefault();
          this.state.activeElement.openSubMenu();
          break;

        case 39: //Right
          e.preventDefault();
          this.state.activeElement.focusTo('right');
          break;
        case 37: //Left
          e.preventDefault();
          this.state.activeElement.focusTo('left');
          break;

        case 40: //Down
          e.preventDefault();
          //  this.state.activeElement.focusTo('down');
          break;

        case 38: //Up
          e.preventDefault();
          //  this.state.activeElement.focusTo('up');
          break;
      }
    } else if (this.state.deep > 0) {
      /**
       * In this case we move inside one of  submenus
       *
       */
      switch (e.keyCode) {
        case 37: //Left
          this.state.activeElement.focusFromSub(this.state.deep);
          break;
        case 40: //Down
          e.preventDefault();
          this.state.activeElement.focusTo('right');
          break;
        case 38: //Up
          e.preventDefault();
          this.state.activeElement.focusTo('left');
          break;
      }
    }

  }
  focusTo(to,toRoot) {
    this.state.activeElement.focusTo(to,toRoot);
    toRoot&&this.props.onFocusExpanded()
  }
  escapeMenu(){
    console.log('escape menu')
      this.state.activeElement.escapeMenu();
  }
  openMenu(e) {
    e.preventDefault();
    this.state.activeElement.openSubMenu();
  }
  closeSubMenu(e) {
    e.preventDefault();
    this.state.activeElement.closeSubMenu();
  }

  render() {
    var {deep} = this.props;

    var result = React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        deep: deep,
        setElement: this.setElement.bind(this),
        keyHandler: this.keyHandler.bind(this),
        openMenu: this.openMenu.bind(this),
        closeSubMenu: this.closeSubMenu.bind(this),
        focusTo: this.focusTo.bind(this),
        escapeMenu:this.escapeMenu.bind(this)
      })
    })

    return (
      <ul deep={deep} role={deep === 0
        ? 'menubar'
        : 'menu'} styleName={this.props.deep === 0
        ? 'main'
        : 'container'}>
        {result}
      </ul>
    )
  }
}
export default CSSModules(Container, styles, {allowMultiple: true})
