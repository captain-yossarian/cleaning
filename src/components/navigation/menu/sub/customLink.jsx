import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './customlink.scss';

class CustomLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabindex: -1
    }

  }
  setElement(e) {
    this.props.setElement(e.target, this.props.deep)
    console.log('setElement')
    this.props.changeTabindex(this.props.rootElement,'force')
  }
  accessibility(e, deep) {

    switch (deep) {
      case 0:
        switch (e.keyCode) {
          case 13: //Enter
          case 32: //Space
          case 38: //Up
          case 40: //Down
            !this.props.expanded && this.props.openMenu(e);
            break;
            case 37:
            case 39:
            console.log('CASE LEFT/RIGHT')
            break;

        }
        break;
      default:
        switch (e.keyCode) {
          case 13: //Enter
          case 32: //Space
          case 39: // Right
            this.props.openMenu(e);
            break;
          case 37:
            break;

        }
        break;
    }
  }

  keyHandler(e) {
    var {rootElement,deep}=this.props;
      var isElementRoot = rootElement !== false;
      (e.keyCode == 37 || e.keyCode == 39) && isElementRoot && this.props.changeTabindex(rootElement, e.keyCode)
      this.accessibility(e, deep)
      this.props.keyHandler(e)
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
