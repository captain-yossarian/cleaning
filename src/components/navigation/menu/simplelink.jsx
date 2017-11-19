
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import Link from '../../global/link/link.jsx';

console.log('Link',Link.prototype)
class SimpleLink extends React.PureComponent{
  constructor(props) {
    super(props)
  }
  render(){
      var {name}=this.props;
    return(
      <li styleName='item' role='none'  >
            <Link role='menuitem'  to={name==='Home'?'/':'/'+name}>{name}</Link>
      </li>
    )
  }
}
export default CSSModules(SimpleLink, styles, {allowMultiple: true})
