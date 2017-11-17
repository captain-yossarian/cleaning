import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './navigation.scss';
import PropTypes from 'prop-types';



class Navigation extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav styleName='navigation'>    


      </nav>
    )
  }
}

export default CSSModules(Navigation, styles)
