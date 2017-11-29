import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from '../container.scss';
import CustomLink from './customLink.jsx';
/**
TODO
refactor this code with destructure
*/
class SubMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.openMenu = this.openMenu.bind(this)
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
      /*if UL nested element does not contains activeElement (:focus), menu will collapse*/
      if (!this.liElement.children[1].contains(document.activeElement)) {
        this.setState({expanded: false});
      }
    }, 0)
  }
  shouldComponentUpdate(nextProps,nextState){
    return(
      (this.state.expanded!==nextState.expanded)
      ||(this.props.tabindex!==nextProps.tabindex)
      ?true:false
    )
  }
  render() {
    var {
      deep,
      content,
      name,
      focusExpandedMode,
      tabindex,
      rootElement,
      keyHandler,
      setElement,
      focusTo,coordinates
    } = this.props;
    var css = this.state.expanded
      ? 'hover'
      : 'blur';
    return (
      <li
        deep={deep}
        styleName={`item list ${css} `}
        onClick={e => this.toggleState(e)}
        role='none'
        onFocus={e => this.focusHandler(e)}
        onBlur={e => this.blurHandler(e)}
        ref={liElement => this.liElement = liElement}>
        <CustomLink
          expanded={this.state.expanded}
          openMenu={this.openMenu}
          focusExpandedMode={focusExpandedMode}
          name={name}
          deep={deep}
          coordinates={coordinates}
          tabindex={tabindex}
          rootElement={rootElement}
          setElement={setElement}
          focusTo={focusTo}
          globalKeyboardSupport={(e) => this.props.globalKeyboardSupport(e)}
          toFirstElementInSubMenu={(code) => this.props.toFirstElementInSubMenu(code)}/>
          {content}
      </li>
    )
  }
}

export default CSSModules(SubMenu, styles, {allowMultiple: true})
