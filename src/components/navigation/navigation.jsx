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
    this.state={
        onFocusExpanded:false
    }
    this.onFocusExpanded=this.onFocusExpanded.bind(this)
  }

  onFocusExpanded(){
    this.setState(prevState=>{
    return{
       onFocusExpanded:!prevState.onFocusExpanded
    }
    })
  }
  test(){
  }
  clickHandler(e){
    console.log('click')
  }
  menuGenerator(menu, deep = -1) {
    deep+=1;
    return (
      <Container deep={deep} onFocusExpanded={this.onFocusExpanded} >
        {menu.map((elem, index) =>
        elem.sub
          ? <Item key={index}  onFocusExpanded={this.state.onFocusExpanded}  content={this.menuGenerator(elem.sub, deep)} name={elem.name} list/>
          : <Item key={index} deep={deep}  name={elem.name}/>)}
      </Container>
    )
  }
  render() {

    return (
      <div>
      <nav role='navigation' aria-labelledby="mainmenu" onKeyDown={e=>{this.test(e)}} onClick={e=>this.clickHandler(e)}>
        <h2 id="mainmenu" styleName="visuallyhidden">Main Menu</h2>
        {this.menuGenerator(menu)}
      </nav>
      <a href="#">TEST</a>
    </div>
    )
  }
}

export default CSSModules(Navigation, styles)
