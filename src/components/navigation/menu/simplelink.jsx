
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import Link from '../../global/link/link.jsx';

class SimpleLink extends React.Component{
  constructor(props) {
    super(props)
  }
  keyHandler(e) {
    if(this.props.deep>0&&e.keyCode==39){
      this.props.backToRoot('right')
    }else if(this.props.deep==1&&e.keyCode==37){
        this.props.backToRoot('left')
    }
    else{
        this.props.keyHandler(e)
    }
  }
  setElement(e){
  this.props.setElement(e.target,this.props.deep)
  }

  render(){
      var {name,deep}=this.props;
    return(
      <li
        styleName='item'
        role='none'
        onFocus={e=>this.setElement(e)}
        onKeyDown={e => this.keyHandler(e)} >
            <Link role='menuitem' aria-haspopup={false} tabIndex={deep==0?0:-1}   to={name==='Home'?'/':'/'+name}>{name}</Link>
      </li>
    )
  }
}
export default CSSModules(SimpleLink, styles, {allowMultiple: true})
