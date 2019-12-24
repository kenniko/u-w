import {
  INIT_SIGNUP,
  SIGNUP_LOGIN_SUCCESS,
  SIGNUP_LOGIN_FAIL,
  SIGNUP_NEXT,
  SIGNUP_BACK,
  SET_ADDRESS,
  SET_PHRASE,
  SIGNUP_DATA,
} from '../actions/types';
const INITIAL_STATE = {
  error: null,
  wallet: null,
  signup_data: null,
  phrase: null,
  is_phrase_saved: false,
  screen: 1,
  address: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_SIGNUP:
      return {...state};
    case SIGNUP_LOGIN_SUCCESS:
      return {...state, wallet: action.wallet};
    case SIGNUP_LOGIN_FAIL:
      return {...state, error: action.error};
    case SIGNUP_NEXT:
      return {...state, screen: action.screen};
    case SIGNUP_BACK:
      return {...state, screen: action.screen};
    case SET_ADDRESS:
      return {...state, address: action.address};
    case SET_PHRASE:
      return {...state, phrase: action.phrase};
    case SIGNUP_DATA:
      return {...state, signup_data: action.signup_data};
    default:
      return state;
  }
};
