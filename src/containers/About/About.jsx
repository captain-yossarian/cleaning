import React from 'react';
import ReactDOM from 'react-dom';
import styles from './About.scss';
import CSSModules from 'react-css-modules';





 class About extends React.PureComponent{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <h1 styleName='about'>{'About'}</h1>
        <a href="#">back</a>
      </div>
    )
  }
}
export default CSSModules(About, styles, {allowMultiple: true})
