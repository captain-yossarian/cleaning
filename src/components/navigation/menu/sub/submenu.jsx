import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from '../container.scss';
import CustomLink from './customLink.jsx';

class SubMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      focusExpanded:null
    }
  }



  toggleState(e) {
    e.stopPropagation()

    this.setState(prevState => {
      return {
        expanded: !prevState.expanded
      }
    })

  }
  insideLogic(e, level) {
    switch (level) {
      case 0:
        switch (e.keyCode) {
          case 13: //Enter
          case 32: //Space
            e.preventDefault();
            this.toggleState(e);
            this.props.openMenu(e);
            break;
        }
        break;
      default:
        switch (e.keyCode) {
          case 13: //Enter
          case 32: //Space
          case 39: // Right
            e.preventDefault();
            this.toggleState(e);
            this.props.openMenu(e);
            break;
        }
        break;
    }

  }
  focusHandler(e) {
    this.currentItem.setElement(e.target)
  }
  keyHandler(e) {
    /**
     * If keyPress event occur on top level (deep===0)
     * document.activeElement(:focus) is on the top level navigation, left/right move to, up/bottom must to open the sub menu
     */
    this.insideLogic(e, this.props.deep)
    this.props.keyHandler(e)
  }
  componentWillReceiveProps(props){

    if(props.onFocusExpanded==true){
    //  this.focusHandler()


    }

  }

componentWillUpdate(nextProps, nextState){


}
shouldComponentUpdate(nextProps, nextState){
    return true
}
focusHandler(){
  setTimeout(()=>{
     console.log('CustomLink',this.props)
     if(this.props.onFocusExpanded&&this.props.deep==0){
         this.setState({expanded: true});
     }
  },0)
}

  blurHandler(e) {
    setTimeout(() => {
      if (!this.liElement.children[1].contains(document.activeElement)) {
        this.setState({expanded: false});
      }
    }, 0)
  }


  render() {
    var {deep, content, name,onFocusExpanded} = this.props;
    return (
      <li
        deep={deep}

        styleName={`item list ${this.state.expanded ? 'hover': 'blur'} `}
        onClick={e => this.toggleState(e)}
        role='menuitem'
        aria-haspopup={true}
        aria-expanded={this.state.expanded}
        onFocus={e=>this.focusHandler(e)}
        onBlur={e => this.blurHandler(e)}
        ref={liElement => this.liElement = liElement}>
        <CustomLink   expanded={onFocusExpanded} name={name} deep={deep} setElement={this.props.setElement} keyHandler={e => this.keyHandler(e)}/> {content}
      </li>
    )
  }
}
export default CSSModules(SubMenu, styles, {allowMultiple: true})
// /onClick={e => this.toggleState(e)}
