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
      this.element.nextElementSibling.children[0].children[0].focus()
    }, 0)
  }
  closeSubMenu() {
    setTimeout(() => {
      //this.element.previousSibling.children[0].focus()
    }, 0)
  }
  focusFromSub(deep) {
    if (deep == 1) {
      this.element.parentElement.parentElement.previousElementSibling.parentElement.previousElementSibling.children[0].focus()
    } else {
      this.element.parentElement.parentElement.previousElementSibling.focus()
    }

  }
  backToRoot(direction) {
    var side = {
      'right': 'nextElementSibling',
      'left': 'previousElementSibling'
    }

    function findRootParent(element, parent = element.parentElement) {
      return parent.getAttribute('deep') == 0
        ? parent
        : findRootParent(parent)
    }
    var result = findRootParent(this.element)

    var resultSideDirection = result[side[direction]];

    if (resultSideDirection !== null) {
      result[side[direction]].children[0].focus()
    } else {
      result.parentElement.children[direction == 'right'
          ? 0
          : result.parentElement.children.length - 1].children[0].focus()
    }

  }

  focusTo(direction) {
    //console.log('getAttribute', this.element.parentElement.getAttribute('deep'))
    var side = {
      'right': 'nextElementSibling',
      'left': 'previousElementSibling',
      'down': 'nextElementSibling',
      'up': 'previousElementSibling'
    }
    /**
     * ActiveElement is on the top level navigation, left/right move to, up/bottom must to open the sub menu
     *
     *
     */

    var ref = this.element.parentElement;
    var refSideDirection = ref[side[direction]];
    var refParentChildren = ref.parentElement.children;

    //  if (ref.getAttribute('deep') == '0' || ref.parentElement.getAttribute('deep') == '0') {
    if (refSideDirection !== null) {
      refSideDirection.children[0].focus()
    } else {
      refParentChildren[direction == 'right' || direction == 'down'
          ? 0
          : refParentChildren.length - 1].children[0].focus()
    }

    //    }
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
    if (this.state.deep == 0) {
      /**
       * In this case we move on the top (root) level navigation
       */
      switch (e.keyCode) {
        case 13: //Enter
        case 32: //Space
        case 40:
        case 38:
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
        case 13: //Enter
        case 32: //Space

          e.preventDefault();

          break;

        case 39: //Right
          e.preventDefault();

          // this.state.activeElement.focusTo('right');
          break;
        case 37: //Left
          // e.preventDefault();
          this.state.activeElement.focusFromSub(this.state.deep);
          break;

        case 40: //Down
          e.preventDefault();
          this.state.activeElement.focusTo('down');
          break;

        case 38: //Up
          e.preventDefault();
          this.state.activeElement.focusTo('up');
          break;
      }
    }

  }
  focusTo(to) {

    this.state.activeElement.focusTo(to);
  }
  backToRoot(direction) {
    this.state.activeElement.backToRoot(direction)
    this.props.onFocusExpanded()

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
        backToRoot: this.backToRoot.bind(this)
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
