import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './menu/container.scss';
import PropTypes from 'prop-types';

import Test from './test.jsx';
import Wrapper from '../wrapper.js';
import NavigationItem from './controller.ts';
import SubMenu from './menu/sub/submenu.jsx';
import SimpleLink from './menu/simplelink.jsx';



import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../../actions/addToCart.js';

/**
 * Useful links
 * https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
 * https://www.w3.org/TR/wai-aria-practices/#menu
 * Roving technique:
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
 */

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeElement: null
    }
    this.setElement = this.setElement.bind(this);
    this.globalKeyboardSupport = this.globalKeyboardSupport.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.focusTo = this.focusTo.bind(this);
    this.toFirstElementInSubMenu = this.toFirstElementInSubMenu.bind(this);
    this.menuGenerator = this.menuGenerator.bind(this)
  }

  setElement(element,deep,elementIndex) {
    this.props.assignElement(deep,elementIndex);
    this.setState({
      activeElement: new NavigationItem(element),
      deep: deep
    }, ()=>{console.log('setElement')})
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
    this.state.activeElement.unbindToGarbageCollector();
    this.setState({ activeElement: null},this.showState)
  }
  showState(){
    console.log('garbage collector')
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
    switch (this.props.deep) {
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
            this.props.deep== 1
              ? this.focusTo('same', 'root')
              : this.state.activeElement.focusFromSub(this.props.deep, e.keyCode);
            this.disableFocusExpanded();
            break;
          case 37: //Left
                    console.log('this.state.activeElement',this.state.activeElement);
            this.props.deep == 1
            /*If parent menu item is in the menubar, also:
           * -moves focus to previous item in the menubar.
           * -opens submenu of newly focused menubar item, keeping focus on that parent menubar item.*/
              ? this.focusTo('left', 'root')
              /*If submenu os deeper,Closes submenu and moves focus to parent menu item.*/
              : this.state.activeElement.focusFromSub(this.props.deep, e.keyCode);
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
    toRoot && !this.props.focusExpandedMode && this.enableFocusExpanded()
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
    this.props.switchFocusExpanded('on')
    this.turnedOn()
  }
  disableFocusExpanded() {
    /*
     TODO
     every time if focusMode is turnedOff if I press Esc it is again turned off, fix it!
     */
    this.props.switchFocusExpanded('off')
    this.turnedOff();
  }
  turnedOn() {
  //  console.log('%cFocusExpandedMode turned ON', "color:green")
  }
  turnedOff() {
    //console.log('%cFocusExpandedMode turned OFF', "color:red")
  }
  /**
   * This function generates menubar (valid HTML)   *
   * My answer on stackoverflow for clean html
   * ----> https://stackoverflow.com/questions/9362446/how-can-i-recursively-create-a-ul-lis-from-json-data-multiple-layers-deep/46586351#46586351
   * @param  {[object:Menu[]]} menu     TypeScript:
   * interface Menu {
   *  name: string;
   *  childIds?:Menu[]
   *  },
   *  only this format is valid
   * @param  {Number} deep              [deep of nested DOMnode]
   * @return {[HTMLElement]}            [UL element with recursively nested UL]
   */
  menuGenerator(menu,filter, deep = -1) {
    deep += 1;
    var rootIndex = -1;
    var {
      setElement,
      globalKeyboardSupport,
      openMenu,
      focusTo,
      toFirstElementInSubMenu} = this;
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

    var attr = ((deep) => {
      return deep == 0
        ? {
          aria: 'menubar',
          css: 'main'
        }
        : {
          aria: 'menu',
          css: 'container'
        }
    })(deep);
    return (
      <ul deep={deep} role={attr.aria} styleName={attr.css}>
        {filter.map((elem, index) => {
          var same = {
            key: index,
            name: menu[elem].name,
            tabindex: menu[elem].tabindex,
            rootElement: menu[elem].id,
            rovingTabindex: this.props.rovingTabindex,
            previousElement:this.props.previousElement,
            deep
          }
          /*Check if element has  children */
          return (menu[elem].childIds
            ? <SubMenu {...same}
              content={this.menuGenerator(this.props.tree,menu[elem].childIds, deep)}
              focusExpandedMode={this.props.focusExpandedMode}
              {...submenu}/>
            : <SimpleLink
              {...same}
              {...simplelink}/>)
        })
      }
      </ul>
    )
  }

  shouldComponentUpdate(nextProps) {
    console.log('nextProps',nextProps)
    return this.props == nextProps
      ? false
      : true;
  }

  render() {
    console.log('Navigation::render')
    return (
      <div>
        <nav role='navigation'
          aria-labelledby="mainmenu"
          onKeyDown={e => this.keyHandler(e)}
          onClick={e => this.clickHandler(e)}>
          {this.menuGenerator(this.props.tree,this.props.tree[0].childIds)}
        </nav>
      </div>
    )
  }
}



const mapDispatchToProps = (dispatch) => bindActionCreators(AppActions, dispatch);
function mapStateToProps (state) {
  return {
    tree:state.navState.tree,
    focusExpandedMode:state.navState.focusExpandedMode,
    deep:state.navState.deep
  }
}


const CSSModule=CSSModules(Navigation,styles,{allowMultiple:true});
var NavigationWrapper = connect(mapStateToProps,mapDispatchToProps)(CSSModule)
export default NavigationWrapper;
