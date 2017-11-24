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
      expanded: false
    }
    this.openMenu=this.openMenu.bind(this)
  }
  toggleState(e) {
    e.stopPropagation();
      this.setState(prevState => {
        return {
          expanded: !prevState.expanded
        }
      })

  }
  openMenu(e) {
    e.preventDefault();
    this.toggleState(e);
    this.props.openMenu(e);
  }

  focusHandler() {
    setTimeout(() => {
      if (this.props.focusExpandedMode && this.props.deep == 0) {
        this.setState({expanded: true});
      }
    }, 0)
  }
  blurHandler(e) {
    setTimeout(() => {
      if (!this.liElement.children[1].contains(document.activeElement)) {
        this.setState({expanded: false,forceTabIndex:-1});
      }
    }, 0)
  }
keyHandler(e){
  if(e.keyCode==27){
    console.log('ESCAPE')
  //  this.props.escapeMenu(e)
  // this.setState({expanded: false},(e)=>this.props.escapeMenu(e));
  }
}
  render() {
    var {deep, content, name,focusExpandedMode,tabindex,rootElement,keyHandler,setElement} = this.props;
    console.log('submenu tabindex',tabindex)
      var css=this.state.expanded ? 'hover': 'blur';
    return (
      <li deep={deep}
        styleName={`item list ${css} `}
        onClick={e => this.toggleState(e)}
        role='menuitem'
        aria-haspopup={true}
        aria-expanded={this.state.expanded}
        onFocus={e => this.focusHandler(e)}
        onBlur={e => this.blurHandler(e)}
        onKeyDown={e=>this.keyHandler(e)}
        ref={liElement => this.liElement = liElement}>

        <CustomLink
          expanded={this.state.expanded}
          openMenu={this.openMenu}
          focusExpandedMode={focusExpandedMode}
          name={name}
          deep={deep}
          tabindex={tabindex}
          rootElement={rootElement}
          changeTabindex={this.props.changeTabindex}
          setElement={setElement}
          keyHandler={e => this.props.keyHandler(e)}/>


          {content}
      </li>
    )
  }
}

export default CSSModules(SubMenu, styles, {allowMultiple: true})
