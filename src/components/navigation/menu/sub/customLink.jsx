import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './customlink.scss';

class CustomLink extends React.Component {
  constructor(props) {
    super(props)
  }
  setElement(e) {
    this.props.setElement(e.target, this.props.deep)
    this.props.changeTabindex(this.props.rootElement,'force')
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
      this.props.keyHandler(e,this.props.rootElement)
  }
  render() {
    var tabindex = this.props.deep == 0 ? this.props.tabindex : -1;
    return (
      <a ref={anchor => this.anchor = anchor} href="#"
        role='menuitem'
        tabIndex={tabindex}
        onFocus={e => this.setElement(e)}
        onClick={e => e.preventDefault()}
        onKeyDown={e => this.keyHandler(e)}
        styleName='link'>{this.props.name}/{this.props.tabindex}</a>
    )
  }
}

export default CSSModules(CustomLink, styles, {allowMultiple: true})
