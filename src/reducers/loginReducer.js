import {
  INIT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_DATA,
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  wallet: {},
  loginData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {...state};
    case LOGIN_SUCCESS:
      return {...state, wallet: action.wallet};
    case LOGIN_FAIL:
      return {...state, error: action.error};
    case LOGIN_DATA:
      return {...state, loginData: action.loginData};
    default:
      return state;
  }
};
