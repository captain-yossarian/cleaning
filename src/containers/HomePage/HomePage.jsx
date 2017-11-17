import React from 'react';
import ReactDOM from 'react-dom';
import styles from './HomePage.scss';
import CSSModules from 'react-css-modules';
import Header from '../../components/header/header.jsx';
import Wrapper from '../../components/wrapper.js';








export  class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      test:'none'
    }
  }
  handleClick() {
    this.setState({show: true,test:'test'})
    this.props.addToCart('Ukrainian salo 5kg',5,1000)
  }
  render() {

    var {cart}=this.props.cart.cart;
    var result=cart.map((elem,index)=>{
      return (
        <span key={index}>{elem.product}</span>
      )
    })

    return (
      <div>
        <button id='btn' styleName={this.state.test} onClick={(e) => this.handleClick()}>Click</button>
        <p>hello</p>
        <p>{result}</p>
        {this.state.show
          ? <Header theme='empty'/>
          : null}
      </div>
    )
  }
}


export default Wrapper(HomePage,styles);
