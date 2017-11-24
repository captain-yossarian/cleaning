import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './header.scss';
import PropTypes from 'prop-types';
import Navigation from '../navigation/navigation.jsx';


class Header extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <header styleName='header'>
        <Navigation/>
      </header>
    )
  }
}

export default CSSModules(Header, styles)
