import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './navigation.scss';
import PropTypes from 'prop-types';

import {menu} from './menu.js';
import Container from './menu/container.jsx';
import Item from './menu/item.jsx';

class Navigation extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  menuGenerator(menu, deep = -1) {
    deep+=1;
    return (
      <Container deep={deep}>
        {menu.map((elem, index) =>
        elem.sub
          ? <Item key={index} content={this.menuGenerator(elem.sub, deep)} name={elem.name} list/>
          : <Item key={index} deep={deep}  name={elem.name}/>)}
      </Container>
    )
  }
  render() {

    return (
      <nav role='navigation' aria-labelledby="mainmenu">
        <h2 id="mainmenu" styleName="visuallyhidden">Main Menu</h2>
        {this.menuGenerator(menu)}
      </nav>
    )
  }
}

export default CSSModules(Navigation, styles)
