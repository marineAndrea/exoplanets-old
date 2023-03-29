import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import axes from './axes';

const rootReducer = combineReducers({axes, routing: routerReducer});

export default rootReducer;