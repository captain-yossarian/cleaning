import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../actions/addToCart.js';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(AppActions, dispatch)
}


/**
 * return values depend on reducers.We have one reduce and we return one object 'cart'
EXAMPLE -> from article https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3
here we have 3 reducers
const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};
 */
function mapStateToProps (state) {
  return {
    tree:state.navState.tree,
    focusExpandedMode:state.navState.focusExpandedMode,
    deep:state.navState.deep
  }
}


export default function Wrapper(component,styles){
  const CSSModule=CSSModules(component,styles,{allowMultiple:true});
  return connect(mapStateToProps,mapDispatchToProps)(CSSModule);
}
