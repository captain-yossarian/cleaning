import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './test.scss';
import Wrapper from '../wrapper.js';

function filterByArray(original, filter, by = 'id') {

  return original.filter((el, index) => {
    return filter.indexOf(el[by]) !== -1
      ? true
      : false
  })
}
class Test extends React.Component {
  constructor(props) {
    super(props)
  }
  foo(immutable,filter=[]) {
  	//var gen=filterByArray(immutable,filter)
    return `<ul>
    ${filter.map((elem,index) => {
  		if(immutable[elem].childIds){
        return `<li>${immutable[elem].name}${this.foo(immutable,immutable[elem].childIds)}</li>`
  		}else{
  			return `<li>${immutable[elem].name}</li>`
  		}

        })

  }
    </ul>`
  }
  render() {
    console.log(this.props.navigation.navState.tree)
    return (
      <div>
        <p>TEST</p>
        <ul>
          {this.foo(this.props.navigation.navState.tree,this.props.navigation.navState.tree[0].childIds)}
        </ul>
      </div>
    )
  }
}

var TestWrapper = Wrapper(Test, styles);
export default TestWrapper;
