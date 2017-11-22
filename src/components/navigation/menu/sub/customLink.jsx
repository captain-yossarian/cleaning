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
    this.setState({tabindex: 0})
  }
  showState() {console.log()}
  accessibility(e, deep) {
    if(e.keyCode==38||e.keyCode==40){
          console.log('down')
    }
    switch (deep) {
      case 0:
        switch (e.keyCode) {
          case 13: //Enter
          case 32: //Space
          case 38: //Up
          case 40: //Down
            !this.props.parentExpanded && this.props.openMenu(e);
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

  componentWillReceiveProps(nextProps) {
    if(this.props.parentExpanded&&!this.props.expanded){
      console.log('check')
      this.setState({
        tabindex: -1
      }, this.showState)
    }
  }

  keyHandler(e) {
    this.accessibility(e, this.props.deep)
    if (e.keyCode == 37 || e.keyCode == 39) {
      console.log('second')
      this.setState({
        tabindex: -1
      }, this.showState)
    }
    this.props.keyHandler(e)
  }
  render() {
    var tabindex = this.props.deep == 0 ? this.state.tabindex : -1;
    return (
      <a ref={anchor => this.anchor = anchor} href="#"
        role='menuitem'
        tabIndex={this.props.deep == 0 ? this.state.tabindex : -1}
        onFocus={e => this.setElement(e)}
        onClick={e => e.preventDefault()}
        onKeyDown={e => this.keyHandler(e)}
        styleName='link'>{this.props.name}</a>
    )
  }
}

export default CSSModules(CustomLink, styles, {allowMultiple: true})
