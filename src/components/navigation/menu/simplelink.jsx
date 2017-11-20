
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import Link from '../../global/link/link.jsx';

class SimpleLink extends React.PureComponent{
  constructor(props) {
    super(props)
  }
  keyHandler(e) {
    this.props.keyHandler(e)
  }
  setElement(e){
  this.props.setElement(e.target)
  }

  render(){
      var {name,deep}=this.props;
    return(
      <li styleName='item' role='none' onFocus={e=>this.setElement(e)} onKeyDown={e => this.keyHandler(e)} >
            <Link role='menuitem' tabIndex={deep==0?0:-1}   to={name==='Home'?'/':'/'+name}>{name}</Link>
      </li>
    )
  }
}
export default CSSModules(SimpleLink, styles, {allowMultiple: true})
