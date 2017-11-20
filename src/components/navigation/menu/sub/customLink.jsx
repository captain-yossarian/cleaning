import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './customlink.scss';



class CustomLink extends React.PureComponent {
  constructor(props) {
    super(props)

  }
  setElement(e){

    this.props.setElement(e.target)
  }
  keyHandler(e){
    this.props.keyHandler(e)
  }


  render() {
    if(this.props.deep==0){
    }
    var deep=this.props.deep===0?0:-1;
    return (
      <a href="#" role='menuitem'
        tabIndex={deep}
        onFocus={e=>this.setElement(e)}
        onClick={e=>e.preventDefault()}
        onKeyDown={e => this.keyHandler(e)}
        styleName='link'>{this.props.name}</a>
    )
  }
}

export default CSSModules(CustomLink, styles, {allowMultiple: true})
