import {INIT_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_DATA} from './types';
import {API} from '../utils/axios';

export const initLogin = () => {
  return {type: INIT_LOGIN};
};

export const walletLogin = ({address, password}) => {
  return dispatch => {
    API.get('/user/address/' + address)
      .then(function(response) {
        if (response.data.status) {
          loginSuccess(dispatch, response.data.message.data);
        } else {
          loginFail(dispatch, response.data.message);
        }
      })
      .catch(function(error) {
        loginFail(dispatch, error.message);
      });
  };
};

const loginFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_FAIL,
    error: error,
  });
};

const loginSuccess = (dispatch, wallet) => {
  dispatch({
    type: LOGIN_SUCCESS,
    wallet: wallet,
  });
};

export const setLoginData = loginData => {
  return dispatch => {
    dispatch({
      type: LOGIN_DATA,
      loginData: loginData,
    });
  };
};
