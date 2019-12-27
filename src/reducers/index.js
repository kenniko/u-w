import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import importReducer from './importReducer';

export default combineReducers({
  loginReducer,
  registerReducer,
  importReducer,
});
