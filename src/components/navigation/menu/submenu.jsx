import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import CustomLink from './customLink.jsx';

class SubMenu extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }
  mouseEnterHandler() {
    console.log('enter handler')
    this.expand()
          console.log('current state',this.state.expanded)
  }
  mouseLeaveHandler() {
    this.collapse()
  }
  toggleState() {
    console.log('toggle state')
    this.setState(prevState => {
      return {
        expanded: !prevState.expanded
      }
    })
      console.log('current state',this.state.expanded)
  }
  collapse(){
    console.log('collapse')
    this.setState({
      expanded:false
    })
  }
  expand(){
      console.log('expand')
    expanded:true
  }
  clickHandler(e){
    e.preventDefault();
    console.log('Click',e.keyCode)
    if(e.keyCode===13){
      this.toggleState();
    }
  }
  render() {
    var {deep, content, name} = this.props;
    return (
      <li
        deep={deep}
        styleName={`item list ${this.state.expanded?'hover':'blur'}`}
        onClick={e=>this.toggleState()}
        onKeyDown={e=>this.clickHandler(e)}
        onMouseLeave={e => this.mouseLeaveHandler()}
        onMouseEnter={e => this.mouseEnterHandler()}
        role='menuitem'
        aria-haspopup={true}
        aria-expanded={this.state.expanded}>
          <CustomLink name={name}/>
        {content}
      </li>
    )
  }
}
export default CSSModules(SubMenu, styles, {allowMultiple: true})
