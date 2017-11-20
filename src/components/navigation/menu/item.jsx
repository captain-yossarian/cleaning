import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SubMenu from './sub/submenu.jsx';
import SimpleLink from './simplelink.jsx';


class Item extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return this.props.list?<SubMenu {...this.props}/>:<SimpleLink {...this.props} />
  }
}

export default Item
