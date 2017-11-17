import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './controls.scss';
import PropTypes from 'prop-types';

import {createStore} from 'redux';


class Controls extends React.PureComponent {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div styleName='controls'>
        <button id='click' onClick={e => this.clickHandler(e)}>With Worker</button>
        <button onClick={e => this.withoutWorker(e)}>Without worker</button>

      </div>
    )
  }
}
Header.propTypes = {
  theme: PropTypes.oneOf(['empty', 'filled'])
}
export default CSSModules(Header, styles)
