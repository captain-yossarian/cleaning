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
 * TODO
 * Escape/Home/End logic
 *
 */
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusExpandedMode: false
    }
    this.iterator=-1;
    this.disableFocusExpanded = this.disableFocusExpanded.bind(this)
    this.enableFocusExpanded = this.enableFocusExpanded.bind(this)
  }
  increment(){
    return this.iterator++;
  }

  enableFocusExpanded() {
    this.setState(prevState => {
      return {focusExpandedMode: true}
    }, this.turnedOn)
  }

  shouldComponentUpdate(nextState,nextProps){
  if(this.state.focusExpandedMode!==nextState.focusExpandedMode){
      return true
    }

  }

  disableFocusExpanded() {
    this.setState({
      focusExpandedMode: false
    }, this.turnedOff)
  }

  turnedOn() {
    console.log('%cFocusExpandedMode turned ON', "color:green")
  }

  turnedOff() {
    console.log('%cFocusExpandedMode turned OFF', "color:red")
  }
  clickHandler(e) {}
  menuGenerator(menu, deep = -1) {
  //  this.addRoot()
    deep += 1;

    return (
      <Container deep={deep} enableFocusExpanded={this.enableFocusExpanded} disableFocusExpanded={this.disableFocusExpanded}>
        {menu.map((elem, index) => elem.sub
          ? <Item key={index}  focusExpandedMode={this.state.focusExpandedMode} content={this.menuGenerator(elem.sub, deep)} name={elem.name} list/>
          : <Item key={index}   deep={deep} name={elem.name}/>)}
      </Container>

    )
  }
  handleBlur() {}
  render() {

    return (
      <div>
        <nav role='navigation' aria-labelledby="mainmenu" onClick={e => this.clickHandler(e)} onBlur={e => this.handleBlur(e)}>
          <h2 id="mainmenu" styleName="visuallyhidden">Main Menu</h2>
          {this.menuGenerator(menu)}
        </nav>
        <a href="#">TEST</a>
      </div>
    )
  }
}

export default CSSModules(Navigation, styles)
