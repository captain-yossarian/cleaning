import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './customlink.scss';
import Wrapper  from '../../../wrapper.js';

class CustomLink extends React.Component {
  constructor(props) {
    super(props)
  }
  setElement(e) {
    this.props.setElement(e.target, this.props.deep,this.props.rootElement);
    /*change tabindex onfocus event*/
  (this.props.rootElement < 7)?this.props.rovingTabindex(this.props.rootElement):false;
  }

  shouldComponentUpdate(nextProps,nextState){
  return  nextProps.deep==0?true:false;
  }

  accessibility(e, deep) {
    var side=code=>code==37||code==38 ? 'left':'right';
    /**
     *
     *Accessibility cases according to https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
     *
     */
    switch (deep) {
      /* Keyboard Support, Menubar, root level, only for container link */
      case 0:
        switch (e.keyCode) {
          /*Opens submenu and moves focus to first item in the submenu.*/
          case 13: //Enter
          case 32: //Space
          case 38: //Up
          case 40: //Down
          e.preventDefault();
            !this.props.expanded && this.props.openMenu(e);
            this.props.expanded && this.props.toFirstElementInSubMenu(e.keyCode);

            break;
        }
        break;
      default:
        /* Keyboard Support, Submenu */
        switch (e.keyCode) {
          /**
           * Activates menu item, causing the link to be activated.
           * If focus is on an item with a submenu, opens the submenu and places focus on the first item.
           */
          case 13: //Enter
          case 32: //Space
          case 39: // Right
            this.props.openMenu(e);
            break;
        }
        break;
    }
  }
  keyHandler(e) {
    var {rootElement,deep}=this.props;
      var isElementRoot = rootElement !== false;
      this.accessibility(e, deep)
      this.props.globalKeyboardSupport(e)
  }
  clickHandler(e){
    e.preventDefault();
  }
  blurHandler(e){
    if(this.props.deep == 0){
      console.log('ROOT')
    //this.props.previousElement(this.props.rootElement)
    }
  }

  render() {

    var {tabindex,deep}=this.props;
    return (
      <a  href="#"
        role='menuitem'
        aria-haspopup={true}
        aria-expanded={this.props.expanded}
        tabIndex={deep==0?tabindex:-1}
        onFocus={e => this.setElement(e)}
        onClick={e => this.clickHandler(e)}
        onKeyDown={e => this.keyHandler(e)}
        onBlur={e=>this.blurHandler(e)}
        styleName='link'>{this.props.name}/{tabindex}</a>
    )
  }
}

export default CSSModules(CustomLink, styles, {allowMultiple: true})
