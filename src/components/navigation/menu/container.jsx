import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './container.scss';

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
    var side = {
      'down': 'nextElementSibling',
      'up': 'previousElementSibling'
    }
    var ref = this.element.parentElement;
    var refSideDirection=ref[side[direction]];
    var refParentChildren=ref.parentElement.children;

    if (refSideDirection !== null) {
      refSideDirection.children[0].focus()
    } else {
      refParentChildren[direction == 'down'  ? 0 : refParentChildren.length - 1].children[0].focus()
    }
  }

  focusTo(direction) {
    console.log('getAttribute', this.element.parentElement.getAttribute('deep'))
    var side = {
      'right': 'nextElementSibling',
      'left': 'previousElementSibling',
      'down': 'nextElementSibling',
      'up': 'previousElementSibling'
    }
    var ref=this.element.parentElement;
    var refSideDirection=ref[side[direction]];
    var refParentChildren=ref.parentElement.children;
console.log('direction')

  //  if (ref.getAttribute('deep') == '0' || ref.parentElement.getAttribute('deep') == '0') {
      if(refSideDirection!==null){
         refSideDirection.children[0].focus()
      }else{
        refParentChildren[direction=='right'||direction == 'down'?0:refParentChildren.length-1].children[0].focus()
      }

//    }
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeElement: null
    }
  }

  setElement(element) {
    this.setState({
      activeElement: new NavigationItem(element)
    }, this.getElement)
  }
  getElement() {}
  test() {}
  keyHandler(e) {
    console.log('ping', this.state.activeElement)
    switch (e.keyCode) {
      case 13: //Enter
      case 32: //Space
        console.log('space/enter');
        e.preventDefault();
        this.state.activeElement.openSubMenu();
        break;

      case 39: //Right
        console.log('right');
        this.state.activeElement.focusTo('right');
        break;
      case 37: //Left
        this.state.activeElement.focusTo('left');
        break;

      case 40: //Down
        e.preventDefault();
        this.state.activeElement.focusTo('down');
        break;

      case 38: //Up
        e.preventDefault();
        this.state.activeElement.focusTo('up');
        break;
    }
  }
  openMenu(e) {
    e.preventDefault();
    this.state.activeElement.openSubMenu();
  }
  render() {
    var {deep} = this.props;

    var result = React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        deep: deep,
        setElement: this.setElement.bind(this),
        keyHandler: this.keyHandler.bind(this),
        openMenu: this.openMenu.bind(this)
      })
    })

    return (
      <ul onFocus={e => this.test()} deep={deep} role={deep === 0
        ? 'menubar'
        : 'menu'} styleName={this.props.deep === 0
        ? 'main'
        : 'container'}>
        {result}
      </ul>
    )
  }
}
export default CSSModules(Container, styles, {allowMultiple: true})
