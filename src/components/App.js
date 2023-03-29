import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import DataExplorer from './Templates/DataExplorer';

function mapStateToProps(state) {
  return {
    axes: state.axes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(DataExplorer);

export default App;