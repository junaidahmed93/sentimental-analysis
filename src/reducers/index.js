import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import DashboardReducer from './DashboardReducer';

export default combineReducers({
  loginReducer,
  DashboardReducer,
});
