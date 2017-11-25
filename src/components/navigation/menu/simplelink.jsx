import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import Link from '../../global/link/link.jsx';

class SimpleLink extends React.Component {
  constructor(props) {
    super(props)
  }
  keyHandler(e) {
    /* Keyboard Support for Submenu, only for non-container link
     If focus is on an item that does not have a submenu:*/
    this.props.deep > 0 && e.keyCode == 39
    /*Closes submenu.Moves focus to next item in the menubar.
    * Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.*/
      ? this.props.focusTo('right', 'root')
      /*if item is on the root level,look at container.jsx for root level cases */
      : this.props.globalKeyboardSupport(e)
  }
  setElement(e) {
    this.props.setElement(e.target, this.props.deep)
    /*change tabindex onfocus event*/
    this.props.rootElement!==false?this.props.changeTabindex(this.props.rootElement, 'force'):false;
  }
  render() {
    var {name, deep, rootElement} = this.props;
    var tabindex = rootElement === false  ? -1  : this.props.tabindex;
    return (
      <li styleName='item' role='none' deep={deep} onFocus={e => this.setElement(e)} onKeyDown={e => this.keyHandler(e)}>
        <Link role='menuitem' aria-haspopup={false} tabIndex={tabindex} to={name}>{name}/{this.props.tabindex}
        </Link>
      </li>
    )
  }
}
export default CSSModules(SimpleLink, styles, {allowMultiple: true})
