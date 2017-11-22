
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import Link from '../../global/link/link.jsx';

class SimpleLink extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      tabindex:-1
    }
  }
  keyHandler(e) {
if(e.keyCode==37||e.keyCode==38||e.keyCode==39||e.keyCode==40){
    this.setState({tabindex:-1})
}



    if(this.props.deep>0&&e.keyCode==39){
      this.props.backToRoot('right')
    }else if(this.props.deep==1&&e.keyCode==37){
        this.props.backToRoot('left')
    }
    else{
        this.props.keyHandler(e)
    }
  }
  getState(){
    console.log('STATE',this.state.tabindex)
  }
  setElement(e){
  this.props.setElement(e.target,this.props.deep)
    this.setState({tabindex:0})
  }
componentWillMount(){
    if(this.props.name=='Home'){
      this.setState({tabindex:0})
    }
  }


  render(){

      var {name,deep}=this.props;

    return(
      <li
        styleName='item'
        role='none'
        onBlur={e=>{this.getState(e)}}
        onFocus={e=>this.setElement(e)}
        onKeyDown={e => this.keyHandler(e)} >
            <Link role='menuitem' aria-haspopup={false} tabIndex={deep==0?this.state.tabindex:-1}   to={name==='Home'?'/':'/'+name}>{name}</Link>
      </li>
    )
  }
}
export default CSSModules(SimpleLink, styles, {allowMultiple: true})
