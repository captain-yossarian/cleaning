import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './customlink.scss';



class CustomLink extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      tabindex:-1
    }

  }
  setElement(e){
    this.props.setElement(e.target,this.props.deep)
  this.setState({tabindex:0})
  }
  getState(){
    console.log('STATE',this.state.tabindex)
  }
  keyHandler(e){
    if(e.keyCode==37||e.keyCode==38||e.keyCode==39||e.keyCode==40){
        this.setState({tabindex:-1})
    }
    this.props.keyHandler(e)
  }
  render() {
    return (
      <a href="#" role='menuitem'
        tabIndex={this.props.deep==0?this.state.tabindex:-1}
        onFocus={e=>this.setElement(e)}
        onBlur={e=>{this.getState(e)}}
        onClick={e=>e.preventDefault()}
        onKeyDown={e => this.keyHandler(e)}
        styleName='link'>{this.props.name}</a>
    )
  }
}

export default CSSModules(CustomLink, styles, {allowMultiple: true})
