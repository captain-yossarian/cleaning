import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HomePage.scss';
import CSSModules from 'react-css-modules';
import Header from '../../components/header/header.jsx';
import Wrapper from '../../components/wrapper.js';








export  class HomePage extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
      <Header/>
      </div>
    )
  }
}


export default Wrapper(HomePage,styles);
