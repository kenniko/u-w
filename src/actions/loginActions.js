import {INIT_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from './types';
import storage from '../storage';
import config from '../config';

export const initLogin = () => {
  return {type: INIT_LOGIN};
};

export const getWallet = (address, password) => {
  return new Promise((resolve, reject) => {
    if (!address) {
      reject('Address is required.');
      return;
    }
    if (!password) {
      reject('Password is required.');
      return;
    }
    fetch(
      config.BASE_URL_API + '/user/address/' + address,
      {
        json: true,
        headers: {
          Authorization: 'Bearer ' + config.API_AUTH,
        },
      },
      (err, res, body) => {
        if (err) {
          reject('Wallet Login Failed.');
        } else {
          if (body.status) {
            storage.save({
              key: 'wallet', // Note: Do not use underscore("_") in key!
              data: body.message.data,
              expires: 1000 * 3600,
            });
            resolve(body.message.data);
          } else {
            reject('Wallet Login Failed.');
          }
        }
      },
    );
  });
};

export const walletLogin = ({address, password}) => {
  return dispatch => {
    return getWallet(address, password)
      .then(wallet => loginSuccess(dispatch, wallet))
      .catch(error => loginFail(dispatch, error));
  };
};

const loginFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_FAIL,
    payload: error,
  });
};

const loginSuccess = (dispatch, wallet) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: wallet,
  });
};
