import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './container.scss';


class Container extends React.Component {
  constructor(props) {
    super(props)
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
