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
  componentDidMount() {
    class NavigationItem {
      constructor(element) {
        this.element = element;
      }
      setElement(element) {
        this.element = element;
      }
      openSubMenu() {
        setTimeout(() => {
          this.element.nextElementSibling.children[0].children[0].focus()
        }, 0)
      }
      step(direction) {
        if (direction === 'down') {
          if(!!this.element === true){
              this.element.parentElement.nextElementSibling.children[0].focus()
          }
          else if(!!this.element === false) {
            setTimeout(() => {
              this.element.parentElement.parentElement.children[0].children[0].focus()
            }, 0)
          }
        }

        if (direction === 'up') {
          this.element.parentElement.previousElementSibling.children[0].focus()
          if (this.element.parentElement.previousElementSibling === null) {
          }
        }

      }

      stepUp() {}
      /*
      stepUp() {
        var collection = Array.prototype.slice.call(this.element.parentElement.children);
        var current = collection.filter(elem => {
          return elem.getAttribute('aria-expanded') == 'true';
        })
        this.element = current[0];
        return this
      }
      */
      focusTo(direction) {
        this.element = direction === 'right'
          ? this.element.parentElement.nextSibling.childNodes[0]
          : this.element.parentElement.previousSibling.childNodes[0];

        this.element.focus()
        return this
      }
    }
    this.currentItem = new NavigationItem(this.element);
  }

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



        break;
      case 37: //Left

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
  keyHandler(e){
    this.insideLogic(e)
    this.props.keyHandler(e)
  }


  render() {
    var {deep, content, name} = this.props;
    return (
      <li deep={deep} styleName={`item list ${this.state.expanded
        ? 'hover'
        : 'blur'}`} onClick={e => this.toggleState(e)}    role='menuitem' aria-haspopup={true} aria-expanded={this.state.expanded}>
        <CustomLink name={name} deep={deep} setElement={this.props.setElement} keyHandler={e=>this.keyHandler(e)}/>
        {content}
      </li>
    )
  }
}
export default CSSModules(SubMenu, styles, {allowMultiple: true})
// /onClick={e => this.toggleState(e)}
