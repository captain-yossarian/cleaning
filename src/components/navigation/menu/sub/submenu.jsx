import React from 'react';
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
  shouldComponentUpdate(nextProps, nextState) {
    return ((this.state.expanded !== nextState.expanded) || (this.props.tabindex !== nextProps.tabindex)
      ? true
      : false)
  }
  render() {
    var {
      deep,
      content,
      name,
      focusExpandedMode,
      tabindex,
      rootElement,
      setElement,
      focusTo,
      rovingTabindex,
      previousElement
    } = this.props;
    var settings = {
      deep,
      name,
      focusExpandedMode,
      tabindex,
      rootElement,
      setElement,
      focusTo,
      rovingTabindex,
      previousElement
    }
    var css = this.state.expanded
      ? 'hover'
      : 'blur';
      /*
      onFocusCapture and onBlurCapture
      React has a non-standard behavoir.It invokes focus event on parent, it is wrong, that's why preact does not work in this way.
      We need to avoid using focus/blur event on parent elements;
       */
    return (
      <li deep={deep}
        styleName={`item list ${css} `}
        onClick={e => this.toggleState(e)}
        role='none'
        onFocusCapture={e=>this.focusHandler(e)}
        onBlurCapture={e => this.blurHandler(e)}
        ref={liElement => this.liElement = liElement}>

        <CustomLink
          expanded={this.state.expanded}
          openMenu={this.openMenu}
          {...settings}
          globalKeyboardSupport={(e) => this.props.globalKeyboardSupport(e)}
          toFirstElementInSubMenu={(code) => this.props.toFirstElementInSubMenu(code)}/>
          {content}
      </li>
    )
  }
}

export default CSSModules(SubMenu, styles, {allowMultiple: true})
