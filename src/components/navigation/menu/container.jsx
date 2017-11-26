import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
/**
TODO
remove this component
*/

class Container extends React.Component {
  constructor(props) {
    super(props)
  }
  /*Update only root container , deep==0*/
  shouldComponentUpdate(nextProps,nextState){
  return  nextProps.deep==0?true:false;
  }
  render() {
    var {deep} = this.props;
    return (
      <ul deep={deep} role={deep === 0
        ? 'menubar'
        : 'menu'} styleName={this.props.deep === 0
        ? 'main'
        : 'container'}>
        {this.props.children}
      </ul>
    )
  }
}
export default CSSModules(Container, styles, {allowMultiple: true})
