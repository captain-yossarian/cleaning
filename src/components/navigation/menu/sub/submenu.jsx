import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from '../container.scss';
import CustomLink from './customLink.jsx';

class SubMenu extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }
  componentDidMount() {}

  toggleState(e) {
    e.stopPropagation()
    this.setState(prevState => {
      return {
        expanded: !prevState.expanded
      }
    })
  }
  insideLogic(e) {
    switch (e.keyCode) {
      case 13: //Enter
      case 32: //Space
        e.preventDefault();
        this.toggleState(e);
        this.props.openMenu(e);

        break;
      case 39: //Right
      console.log('Right')
      e.preventDefault();
      this.toggleState(e);
    //  this.props.closeSubMenu(e);
        break;
      case 37: //Left
      e.preventDefault();
      this.toggleState(e);
      this.props.openMenu(e);

        break;

      case 40: //Down

        break;

      case 38: //Up
        e.preventDefault();

        break;

    }
  }
  focusHandler(e) {
    this.currentItem.setElement(e.target)
  }
  keyHandler(e) {

    if(e.keyCode==39){
      this.insideLogic(e)
    }else{
      console.log('else')
        this.insideLogic(e)
      this.props.keyHandler(e)
    }

  }

  blurHandler(e) {

    setTimeout(() => {
      if (!this.liElement.contains(document.activeElement)) {
          console.log('blur')
        this.setState({expanded: false});
      }
    }, 2000)
  }

  render() {
    var {deep, content, name} = this.props;
    return (
      <li deep={deep} styleName={`item list ${this.state.expanded
        ? 'hover'
        : 'blur'}`} onClick={e => this.toggleState(e)} role='menuitem' aria-haspopup={true} aria-expanded={this.state.expanded}  onBlur={e => this.blurHandler(e)} ref={liElement => this.liElement = liElement}>
        <CustomLink name={name} deep={deep} setElement={this.props.setElement} keyHandler={e => this.keyHandler(e)}/> {content}
      </li>
    )
  }
}
export default CSSModules(SubMenu, styles, {allowMultiple: true})
// /onClick={e => this.toggleState(e)}
