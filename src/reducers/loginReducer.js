import {
  INIT_LOGIN,
  SIGNUP_LOGIN_SUCCESS,
  SIGNUP_LOGIN_FAIL,
  LOGIN_DATA,
  WALLET_LIST,
} from '../actions/types';

const INITIAL_STATE = {
  error: null,
  wallet: null,
  loginData: null,
  listWallet: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {...state};
    case SIGNUP_LOGIN_SUCCESS:
      return {...state, wallet: action.wallet};
    case SIGNUP_LOGIN_FAIL:
      return {...state, error: action.error};
    case LOGIN_DATA:
      return {...state, loginData: action.loginData};
    case WALLET_LIST:
      return {...state, listWallet: action.listWallet};
    default:
      return state;
  }
};
