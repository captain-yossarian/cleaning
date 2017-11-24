import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import Link from '../../global/link/link.jsx';

class SimpleLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabindex: -1
    }
  }
  keyHandler(e) {
    if (e.keyCode == 37 || e.keyCode == 39) {
       if (this.props.rootElement !== false) {
         console.log(this.props)
         this.props.changeTabindex(this.props.rootElement, e.keyCode)
       }
     }


    if (this.props.deep > 0 && e.keyCode == 39) {
      this.props.focusTo('right','root')
    } else if (this.props.deep == 1 && e.keyCode == 37) {
      this.props.focusTo('left','root')
    } else {
      this.props.keyHandler(e)
    }
  }

  setElement(e) {
    this.props.setElement(e.target, this.props.deep)
    this.setState({tabindex: 0})
  }
  componentWillMount() {
    if (this.props.name == 'Home') {
      this.setState({tabindex: 0})
    }
  }

  render() {

    var {name, deep, rootElement} = this.props;
     var tabindex = rootElement === false
       ? -1
       : this.props.tabindex;
    return (
      <li styleName='item'
        role='none'
        deep={deep}
        onFocus={e => this.setElement(e)}
        onKeyDown={e => this.keyHandler(e)}>
        <Link role='menuitem' aria-haspopup={false} tabIndex={tabindex} to={name}>{name}/{this.props.tabindex}
        </Link>
      </li>
    )
  }
}
export default CSSModules(SimpleLink, styles, {allowMultiple: true})
