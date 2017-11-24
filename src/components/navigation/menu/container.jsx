import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import NavigationItem from './controller.js';

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeElement: null,
      deep: null,
      tabindex: [0,-1,-1,-1,-1,-1]
    }
  }
  changeTabindex(index, direction) {
    var lastElement = this.state.tabindex.length - 1;
    var move = {
      37: (index) => index == 0
        ? lastElement
        : index - 1,
      39: (index) => index == lastElement
        ? 0
        : index + 1,
      'force': (index) => index
    }
    var next = move[direction](index);
    var tabindex = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1
    ];
    tabindex[next] = 0;

    this.setState({
      tabindex: tabindex
    }, this.showState)
  }

  setElement(element, deep) {
    this.setState({activeElement: new NavigationItem(element), deep: deep})
  }
  /**
   * Global Keyboard Support
   */
  globalKeyboardSupport(e, element) {
    var side = code => code == 37 || code == 38
      ? 'left'
      : 'right';
    /**
     * Moves focus to first/last item in the menubar.
     * Do not depend on deep level
     */
    switch (e.keyCode) {
      case 35: //End
      case 36: //Home
        e.preventDefault();
        this.state.activeElement.goTo(e.keyCode);
        break;
    }

    switch (this.state.deep) {
        /**
       * In this case we move on the top (root) level navigation
       */
      case 0:
        switch (e.keyCode) {
          case 37:
          case 39:
            e.preventDefault();
            /*Moves focus to the next item in the menubar.
           *If focus is on the last item, moves focus to the first item. */
            this.state.activeElement.focusTo(side(e.keyCode));
            /* Changing tabindex according to Roving tabindex technique */
            this.changeTabindex(element, e.keyCode);
            break;
        }
        break;
      default:
        /**
       * In this case we move inside one of  submenus
       *
       */
        switch (e.keyCode) {
            /*
        Closes submenu.
        Moves focus to parent menubar item.
         */
          case 27: //Escape
            this.state.deep == 1
              ? this.focusTo('same', 'root')
              : this.state.activeElement.focusFromSub(this.state.deep, e.keyCode);
            this.props.disableFocusExpanded();
            break;
          case 37: //Left
            this.state.deep == 1
            /*If parent menu item is in the menubar, also:
           * -moves focus to previous item in the menubar.
           * -opens submenu of newly focused menubar item, keeping focus on that parent menubar item.*/
              ? this.focusTo('left', 'root')
              /*If submenu os deeper,Closes submenu and moves focus to parent menu item.*/
              : this.state.activeElement.focusFromSub(this.state.deep, e.keyCode);
            break;
          case 38:
          case 40:
            /* Moves focus to the next item in the submenu.
         * If focus is on the last item, moves focus to the first item. */
            e.preventDefault();
            this.state.activeElement.focusTo(side(e.keyCode));
            break;
        }
        break;
    }
  }

  toFirstElementInSubMenu(code) {
    console.log('toFirstElementInSubMenu', code)
    this.state.activeElement.toFirstElementInSubMenu(code)
  }

  focusTo(to, toRoot) {
    this.state.activeElement.focusTo(to, toRoot);
    toRoot && this.props.enableFocusExpanded()
  }

  openMenu(e) {
    e.preventDefault();
    this.state.activeElement.openSubMenu();
  }

  render() {
    console.log('activeElement',this.state.activeElement)
    var {deep, data} = this.props;
    var rootIndex = -1;
    var result = React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        deep: deep,
        setElement: this.setElement.bind(this),
        globalKeyboardSupport: this.globalKeyboardSupport.bind(this),
        openMenu: this.openMenu.bind(this),
        focusTo: this.focusTo.bind(this),
        rootElement: deep == 0
          ? (rootIndex += 1)
          : false,
        rootIndex: rootIndex,
        tabindex: this.state.tabindex[rootIndex],
        changeTabindex: this.changeTabindex.bind(this),
        toFirstElementInSubMenu: this.toFirstElementInSubMenu.bind(this)
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
