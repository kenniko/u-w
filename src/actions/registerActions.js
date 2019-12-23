import {
  INIT_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_NEXT,
  SIGNUP_BACK,
  SET_PHRASE,
  SET_ADDRESS,
  SIGNUP_ACCOUNT,
} from './types';
import {API} from '../utils/axios';

export const initRegister = () => {
  return {type: INIT_SIGNUP};
};

export const saveRegister = signup_data => {
  let signup = signup_data;
  delete signup.password;
  return dispatch => {
    API.post('/signup', signup)
      .then(function(response) {
        if (response.data.status) {
          registerSuccess(dispatch, response.data.message.data);
        } else {
          registerFail(dispatch, response.data.message);
        }
      })
      .catch(function(error) {
        registerFail(dispatch, error.message);
      });
  };
};

const registerFail = (dispatch, error) => {
  dispatch({
    type: SIGNUP_FAIL,
    error: error,
  });
};

const registerSuccess = (dispatch, wallet) => {
  dispatch({
    type: SIGNUP_SUCCESS,
    wallet: wallet,
  });
};

export const setAddress = address => {
  return dispatch => {
    dispatch({
      type: SET_ADDRESS,
      address: address,
    });
  };
};

export const setPhrase = phrase => {
  return dispatch => {
    dispatch({
      type: SET_PHRASE,
      phrase: phrase,
    });
  };
};

export const onNext = screen => {
  return dispatch => {
    dispatch({
      type: SIGNUP_NEXT,
      screen: screen,
    });
  };
};

export const onBack = screen => {
  return dispatch => {
    dispatch({
      type: SIGNUP_BACK,
      screen: screen,
    });
  };
};

export const setSignupAccount = signup_data => {
  return dispatch => {
    dispatch({
      type: SIGNUP_ACCOUNT,
      signup_data: signup_data,
    });
  };
};
