import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SubMenu from './sub/submenu.jsx';
import SimpleLink from './simplelink.jsx';

/**
you need to hoist logic from submenu and simple link to Item, because left/right dont work on simple link, you cant to close
fly down menu if first link is just simple link
*/
class Item extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return this.props.list?<SubMenu {...this.props}/>:<SimpleLink {...this.props} />
  }
}

export default Item
