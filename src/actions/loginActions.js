import {INIT_LOGIN, LOGIN_DATA, WALLET_LIST} from './types';
import {API} from '../utils/axios';

export const initLogin = () => {
  return {type: INIT_LOGIN};
};

export const getWalletFromServ = (address, callback) => {
  return () => {
    API.get('/user/address/' + address)
      .then(function(response) {
        if (response.data.status) {
          let message = response.data.message;
          if (typeof message.data !== 'undefined') {
            callback(true, message.data);
          } else {
            callback(false, 'Data not found');
          }
        } else {
          callback(false, response.data.message);
        }
      })
      .catch(function(error) {
        callback(false, error.message);
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

export const deleteWalletByAddress = (list, address) => {
  let filteredWallet = [];
  if (list !== null && typeof list !== 'undefined') {
    filteredWallet = list.filter(w => {
      return w.address !== address;
    });
  }
  return dispatch => {
    dispatch({
      type: WALLET_LIST,
      listWallet: filteredWallet,
    });
  };
};
