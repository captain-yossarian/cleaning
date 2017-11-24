import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import styles from './container.scss';
import NavigationItem from './controller.js';



class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeElement: null,
      tabindex: [
      0,
      -1,
      -1,
      -1,
      -1,
      -1
    ]
    }
  }
  changeTabindex(index, direction) {
    console.log('changeTabindex')
   var lastElement=this.state.tabindex.length - 1;
   var move={
     37:(index)=>index==0?lastElement:index-1,
     39:(index)=>index==lastElement?0:index+1,
     'force':(index)=>index
   }
   var  next=move[direction](index);
   var tabindex = [
     -1,
     -1,
     -1,
     -1,
     -1,
     -1
   ];
   tabindex[next] = 0;

   this.setState({tabindex: tabindex},this.showState)
 }
 showState(){
   console.log('this.state.tabindex',this.state.tabindex)
 }

  setElement(element, deep) {
    this.setState({activeElement: new NavigationItem(element), deep: deep})
  }
  keyHandler(e) {
    if (e.keyCode == 35 || e.keyCode == 36) {
      e.preventDefault();
      this.state.activeElement.goTo(e.keyCode)

    } else if (this.state.deep == 0) {
      /**
       * In this case we move on the top (root) level navigation
       */
      switch (e.keyCode) {
        case 13: //Enter
        case 32: //Space
        case 40: //Down
        case 38: //Up
          e.preventDefault();
          this.state.activeElement.openSubMenu();
          break;

        case 39: //Right
          e.preventDefault();
          this.state.activeElement.focusTo('right');
          break;
        case 37: //Left
          e.preventDefault();
          this.state.activeElement.focusTo('left');
          break;

        case 40: //Down
          e.preventDefault();
          //  this.state.activeElement.focusTo('down');
          break;

        case 38: //Up
          e.preventDefault();
          //  this.state.activeElement.focusTo('up');
          break;
      }
    } else if (this.state.deep > 0) {
      /**
       * In this case we move inside one of  submenus
       *
       */
      switch (e.keyCode) {
        case 37: //Left
          this.state.activeElement.focusFromSub(this.state.deep);
          break;
        case 40: //Down
          e.preventDefault();
          this.state.activeElement.focusTo('right');
          break;
        case 38: //Up
          e.preventDefault();
          this.state.activeElement.focusTo('left');
          break;
      }
    }

  }
  focusTo(to, toRoot) {
    this.state.activeElement.focusTo(to, toRoot);
    toRoot && this.props.enableFocusExpanded()
  }
  escapeMenu() {
    this.props.disableFocusExpanded();
    this.state.activeElement.escapeMenu();

    console.log('disable focus expanded')

  }
  openMenu(e) {
    e.preventDefault();
    this.state.activeElement.openSubMenu();
  }
  closeSubMenu(e) {
    e.preventDefault();
    this.state.activeElement.closeSubMenu();
  }

  render() {
    var {deep,data} = this.props;
    var rootIndex=-1;
    var result = React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        deep: deep,
        setElement: this.setElement.bind(this),
        keyHandler: this.keyHandler.bind(this),
        openMenu: this.openMenu.bind(this),
        closeSubMenu: this.closeSubMenu.bind(this),
        focusTo: this.focusTo.bind(this),
        escapeMenu: this.escapeMenu.bind(this),
        rootElement:deep==0?(rootIndex+=1):false,
        rootIndex:rootIndex,
        tabindex: this.state.tabindex[rootIndex],
        changeTabindex: this.changeTabindex.bind(this)
      })
    })
    return (
      <ul deep={deep} role={deep === 0
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
