import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './header.scss';
import PropTypes from 'prop-types';
//import Worker from './worker.js';

import {benchmark} from './benchmark.js';


var arr = Array(9000000).fill(0);
//var start = performance.now()

//const worker = new Worker();

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    /*
    worker.addEventListener('message', e => {
      var end = performance.now();
      var time=end-e.data[1]
      console.log('Main script received message from worker','end time',time)
    })
    */
  }
  componentDidMount() {}
  clickHandler(e) {
    setTimeout(() => {
    //  worker.postMessage([arr])
    }, 0)

    console.log('Message posted to worker')
  }
  withoutWorker() {
    //  benchmark();
  //  var start = performance.now()
    var next = arr.map((elem, index) => elem + index)
  //  var end = performance.now() - start
    console.log(' end time', end)
  }

  render() {
    return (
      <div styleName='header'>
        <button id='click' onClick={e => this.clickHandler(e)}>With Worker</button>
        <button onClick={e => this.withoutWorker(e)}>Without worker</button>
        <a href='#/about'>Test,theme{this.props.theme}</a>
      </div>
    )
  }
}
Header.propTypes = {
  theme: PropTypes.oneOf(['empty', 'filled'])
}
export default CSSModules(Header, styles)
