import {INIT_LOGIN, LOGIN_DATA, WALLET_LIST} from '../actions/types';

const INITIAL_STATE = {
  error: null,
  loginData: null,
  listWallet: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {...state, error: null, loginData: null};
    case LOGIN_DATA:
      return {...state, loginData: action.loginData};
    case WALLET_LIST:
      return {...state, listWallet: action.listWallet};
    default:
      return state;
  }
};
