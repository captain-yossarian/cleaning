import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import Link from '../../global/link/link.jsx';
import Wrapper  from '../../wrapper.js';

class SimpleLink extends React.Component {
  constructor(props) {
    super(props)
  }
  /*
  shouldComponentUpdate(nextProps,nextState){
  return  nextProps.deep==0?true:false;
  }
  */
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
    this.props.setElement(e.target, this.props.deep);
    /*change tabindex onfocus event*/
      (typeof this.props.rootElement==='number')?this.props.rovingTabindex(this.props.rootElement,this.props.coordinates):false

  }

  shouldComponentUpdate(nextProps){
    return (this.props.tabindex!==nextProps.tabindex)?true:false;
  }

  render() {
    var {name, deep, rootElement,tabindex} = this.props;
    return (
      <li styleName='item' role='none' deep={deep} onFocus={e => this.setElement(e)} onKeyDown={e => this.keyHandler(e)}>
        <Link role='menuitem' aria-haspopup={false} tabIndex={deep==0?tabindex:-1} to={name}>{name}/{tabindex}
        </Link>
      </li>
    )
  }
}
export default CSSModules(SimpleLink, styles, {allowMultiple: true})
