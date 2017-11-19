import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './customlink.scss';



class CustomLink extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  clickHandler(e){
    e.preventDefault();
  }
  render() {
    return (
      <a href="#" role='menuitem'  onClick={e=>this.clickHandler(e)} styleName='link'>{this.props.name}</a>
    )
  }
}

export default CSSModules(CustomLink, styles, {allowMultiple: true})
