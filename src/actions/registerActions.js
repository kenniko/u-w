import {INIT_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL} from './types';
import config from '../config';

const TOKEN = config.API_AUTH;

export const initRegister = () => {
  return {type: INIT_SIGNUP};
};

const registerFail = (dispatch, error) => {
  dispatch({
    type: SIGNUP_FAIL,
    payload: error,
  });
};

const registerSuccess = (dispatch, wallet) => {
  dispatch({
    type: SIGNUP_SUCCESS,
    payload: wallet,
  });
};
