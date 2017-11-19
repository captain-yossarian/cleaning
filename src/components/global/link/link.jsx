import React from 'react';
import ReactDOM from 'react-dom';
import styles from './link.scss';
import CSSModules from 'react-css-modules';
import {Route,Link as RouterLink} from 'react-router-dom'


class Link extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <RouterLink  {...this.props}>{this.props.children}</RouterLink>
    )
  }
}
export default CSSModules(Link, styles, {allowMultiple: true});
