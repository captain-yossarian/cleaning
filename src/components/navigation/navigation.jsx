import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './navigation.scss';
import PropTypes from 'prop-types';

import {menu} from './menu.js';
import Container from './menu/container.jsx';
import Item from './menu/item.jsx';

/**
 * https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
 * https://www.w3.org/TR/wai-aria-practices/#menu
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
 */
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusExpandedMode: false
      
    }
    this.disableFocusExpanded = this.disableFocusExpanded.bind(this)
    this.enableFocusExpanded = this.enableFocusExpanded.bind(this)
  }
  enableFocusExpanded() {
    this.setState(prevState => {
      return {focusExpandedMode: true}
    }, this.turnedOn)
  }
  disableFocusExpanded() {
    this.setState(prevState=>{
      if(!prevState.focusExpandedMode){
        return false
      }else{
        return {
          focusExpandedMode: false
        }
      }
    },this.turnedOff)
  }
  turnedOn() {
    console.log('%cFocusExpandedMode turned ON', "color:green")
  }
  turnedOff() {
    console.log('%cFocusExpandedMode turned OFF', "color:red")
  }

  /**
   * This function generates menubar (valid HTML)
   *
   * My answer on stackoverflow for clean html ----> https://stackoverflow.com/questions/9362446/how-can-i-recursively-create-a-ul-lis-from-json-data-multiple-layers-deep/46586351#46586351
   * @param  {[object]} menu     TypeScript: interface Menu { name: string; sub?:{name:string}[]}, only this format is valid
   * @param  {Number} deep       [deep of nested DOMnode]
   * @return {[HTMLElement]}    [UL element with recursively nested UL]
   */
  menuGenerator(menu, deep = -1) {
    deep += 1;
    return (
      <Container deep={deep} enableFocusExpanded={this.enableFocusExpanded} disableFocusExpanded={this.disableFocusExpanded}>
        {menu.map((elem, index) => elem.sub
          ? <Item key={index}  focusExpandedMode={this.state.focusExpandedMode} content={this.menuGenerator(elem.sub, deep)} name={elem.name} list/>
          : <Item key={index}  deep={deep} name={elem.name}/>)}
      </Container>
    )
  }
  render() {
    return (
      <div>
        <nav
          role='navigation'
          aria-labelledby="mainmenu"
          onClick={e => this.clickHandler(e)}
          >
          <h2 id="mainmenu" styleName="visuallyhidden">Main Menu</h2>
          {this.menuGenerator(menu)}
        </nav>
        <a href="#">TEST</a>
      </div>
    )
  }
}

export default CSSModules(Navigation, styles)
