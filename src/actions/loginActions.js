import {
  INIT_LOGIN,
  SIGNUP_LOGIN_SUCCESS,
  SIGNUP_LOGIN_FAIL,
  LOGIN_DATA,
  WALLET_LIST,
} from './types';
import {API} from '../utils/axios';

export const initLogin = () => {
  return {type: INIT_LOGIN};
};

export const walletLogin = (address, callback) => {
  return () => {
    API.get('/user/address/' + address)
      .then(function(response) {
        if (response.data.status) {
          callback(true, response.data.message.data);
        } else {
          callback(false, response.data.message);
        }
      })
      .catch(function(error) {
        callback(false, error.message);
      });
  };
};

const loginFail = (dispatch, error) => {
  dispatch({
    type: SIGNUP_LOGIN_FAIL,
    error: error,
  });
};

const loginSuccess = (dispatch, wallet) => {
  dispatch({
    type: SIGNUP_LOGIN_SUCCESS,
    wallet: wallet,
  });
};

export const setNullSignupLoginFail = () => {
  return dispatch => {
    dispatch({
      type: SIGNUP_LOGIN_FAIL,
      error: null,
    });
  };
};

export const setNullSignupLoginSuccess = () => {
  return dispatch => {
    dispatch({
      type: SIGNUP_LOGIN_SUCCESS,
      wallet: null,
    });
  };
};

export const setLoginData = loginData => {
  return dispatch => {
    dispatch({
      type: LOGIN_DATA,
      loginData: loginData,
    });
  };
};

export const setWalletList = (list, wallet) => {
  let filteredWallet = [];
  if (list !== null && typeof list !== 'undefined') {
    filteredWallet = list.filter(w => {
      return w.address !== wallet.address;
    });
  }
  filteredWallet.push(wallet);
  return dispatch => {
    dispatch({
      type: WALLET_LIST,
      listWallet: filteredWallet,
    });
  };
};
