import React from 'react';
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
    console.log('LI key handler',e.target)
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
      console.log('onFOCUS setElement')

    this.props.setElement(e.target, this.props.deep,this.props.rootElement);

    /*change tabindex onfocus event*/
      (this.props.rootElement < 7)?this.props.rovingTabindex(this.props.rootElement):false
  }

  shouldComponentUpdate(nextProps){
    return (this.props.tabindex!==nextProps.tabindex)?true:false;
  }


  render() {
    var {name, deep, rootElement,tabindex} = this.props;
    console.log('simplelink',this.props)
    return (
      <li styleName='item' role='none' deep={deep}>
        <Link onFocus={e=>this.setElement(e)} onKeyDown={e => this.keyHandler(e)} role='menuitem' aria-haspopup={false} tabIndex={deep==0?tabindex:-1} to={name}>{name}/{tabindex}
        </Link>
      </li>
    )
  }
}
export default CSSModules(SimpleLink, styles, {allowMultiple: true})
