import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage.jsx';



/**
 * TODO
 * link blob appear, fix IT
 */

class About extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
  }
  componentWillMount() {
    return import (/* webpackChunkName: "About" */
    './containers/About/About.jsx').then(component => {
      this.Component = component;
      this.forceUpdate();
    })
  }
  componentWillUnmount(){
  }

  render() {
    return (
      <div>
        {this.Component
          ? <this.Component.default/>
          : null}
        </div>
    )
  }
}

/**
 * Router prototype
 */
export  const Main = (props) => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/about' component={About}/>
    </Switch>
  )
}



export default Main;
