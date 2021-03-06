import {
  INIT_SIGNUP,
  SIGNUP_NEXT,
  SIGNUP_BACK,
  SET_PHRASE,
  SET_ADDRESS,
  SIGNUP_DATA,
  SAVED_PHRASE_CONFIRM,
} from './types';
import {API} from '../utils/axios';

export const initRegister = () => {
  return {type: INIT_SIGNUP};
};

export const saveRegister = (signup_data, callback) => {
  let signup = {
    address: signup_data.address,
    email: signup_data.email,
    telegram_id: signup_data.telegram_id,
    name: signup_data.name,
    referrer_id: signup_data.referrer_id,
  };
  return () => {
    API.post('/signup', signup)
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

export const setSignupData = signup_data => {
  return dispatch => {
    dispatch({
      type: SIGNUP_DATA,
      signup_data: signup_data,
    });
  };
};

export const setPhraseSaved = is_phrase_saved => {
  return dispatch => {
    dispatch({
      type: SAVED_PHRASE_CONFIRM,
      is_phrase_saved: is_phrase_saved,
    });
  };
};
