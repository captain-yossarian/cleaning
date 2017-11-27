import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './navigation.scss';
import PropTypes from 'prop-types';

import Container from './menu/container.jsx';
import Wrapper from '../wrapper.js';
import NavigationItem from './menu/controller.ts';
import SubMenu from './menu/sub/submenu.jsx';
import SimpleLink from './menu/simplelink.jsx';

/**
 * Useful links
 * https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
 * https://www.w3.org/TR/wai-aria-practices/#menu
 * Roving technique:
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
 */
/**
  * This is the 'container' component
  *TODO  Do I need to bind it with Redux?
  */
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusExpandedMode: false,
      activeElement: null,
      deep: null
    }
    this.disableFocusExpanded = this.disableFocusExpanded.bind(this);
    this.enableFocusExpanded = this.enableFocusExpanded.bind(this);
    this.setElement = this.setElement.bind(this);
    this.globalKeyboardSupport = this.globalKeyboardSupport.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.focusTo = this.focusTo.bind(this);
    this.toFirstElementInSubMenu = this.toFirstElementInSubMenu.bind(this);
    this.menuGenerator = this.menuGenerator.bind(this)
  }

  setElement(element, deep) {
    this.setState({
      activeElement: new NavigationItem(element),
      deep: deep
    }, this.showState)
  }
  keyHandler(e) {
    if (e.keyCode == 9) {
      this.unbindElementToGarbageCollector()
    }
  }
  /*
   * If root manu does not contains activeElement(:focus),
   * this.state.activeElement sending to garbage collector,
   * other words,we reset the state on 'Tab' press
   */
  unbindElementToGarbageCollector() {
    this.setState({
      focusExpandedMode: false,
      activeElement: null,
      deep: null
    })
  }
  /**
   * Global Keyboard Support
   * This logic will aplly for all component
   * @param {[event]} e [event from callback]
   * @return {void}
   */
  globalKeyboardSupport(e) {
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
            this.disableFocusExpanded();
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
  /*Focus on first/last element in UL*/
  toFirstElementInSubMenu(code) {
    this.state.activeElement.toFirstElementInSubMenu(code)
  }
  /*Focus to left/right/up/down*/
  focusTo(to, toRoot) {
    this.state.activeElement.focusTo(to, toRoot);
    /*if toRoot is truthy, we activate mode which open the menu on focus (root menuitem)*/
    toRoot && this.enableFocusExpanded()
  }
  openMenu(e) {
    this.state.activeElement.openSubMenu();
  }
  /* If you switch out from non-list element you will enable this mode
   * If focus is on an item that does not have a submenu:Closes submenu.
   * Moves focus to next item in the menubar.
   * Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.
   * */
  enableFocusExpanded() {
    this.setState(prevState => {
      return {focusExpandedMode: true}
    }, this.turnedOn)
  }
  disableFocusExpanded() {
    this.setState(prevState => {
      if (!prevState.focusExpandedMode) {
        return false
      } else {
        return {focusExpandedMode: false}
      }
    }, this.turnedOff)
  }
  turnedOn() {
    console.log('%cFocusExpandedMode turned ON', "color:green")
  }
  turnedOff() {
    console.log('%cFocusExpandedMode turned OFF', "color:red")
  }
  /**
   * This function generates menubar (valid HTML)   *
   * My answer on stackoverflow for clean html
   * ----> https://stackoverflow.com/questions/9362446/how-can-i-recursively-create-a-ul-lis-from-json-data-multiple-layers-deep/46586351#46586351
   * @param  {[object:Menu[]]} menu     TypeScript: interface Menu { name: string; sub?:Menu[]}, only this format is valid
   * @param  {Number} deep              [deep of nested DOMnode]
   * @return {[HTMLElement]}            [UL element with recursively nested UL]
   */

  menuGenerator(menu, deep = -1) {
    deep += 1;
    var rootIndex = -1;
    var {setElement, globalKeyboardSupport, openMenu, focusTo, toFirstElementInSubMenu} = this;
    var simplelink = {
      setElement,
      globalKeyboardSupport,
      focusTo
    };
    var submenu = {
    ...simplelink,
      openMenu,
      toFirstElementInSubMenu
    };

    return (
      <Container deep={deep}>
        {menu.map((elem, index) => {
          var same={
            key:index,
            name:elem.name,
            tabindex:elem.tabindex,
            rootElement:elem.id,
            coordinates:elem.coordinates,
            deep
          }
          return (elem.sub
            ? <SubMenu

              {...same}
              content={this.menuGenerator(elem.sub, deep)}
              focusExpandedMode={this.state.focusExpandedMode}
              {...submenu}/>
            : <SimpleLink
              {...same}
              {...simplelink}/>)
        })
}
      </Container>
    )
  }
  shouldComponentUpdate(prevState, prevProps) {
    return true;
  }
  render() {
    return (
      <div>
        <nav role='navigation' aria-labelledby="mainmenu" onKeyDown={e => this.keyHandler(e)} onClick={e => this.clickHandler(e)}>
          <h2 id="mainmenu" styleName="visuallyhidden">
            Main Menu
          </h2>
          {this.menuGenerator(this.props.navigation.navState.menu)}
        </nav>
        <a href="#">TEST</a>
      </div>
    )
  }
}
var NavigationWrapper=Wrapper(Navigation, styles);
export default NavigationWrapper;
