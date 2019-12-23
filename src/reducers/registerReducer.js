import {
  INIT_SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_NEXT,
  SIGNUP_BACK,
  SET_ADDRESS,
  SET_PHRASE,
  SIGNUP_ACCOUNT,
} from '../actions/types';
const INITIAL_STATE = {
  error: '',
  wallet: {},
  signup_data: {},
  phrase: '',
  is_phrase_saved: false,
  screen: 1,
  address: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_SIGNUP:
      return {...state};
    case SIGNUP_SUCCESS:
      return {...state, wallet: action.wallet};
    case SIGNUP_FAIL:
      return {...state, error: action.error};
    case SIGNUP_NEXT:
      return {...state, screen: action.screen};
    case SIGNUP_BACK:
      return {...state, screen: action.screen};
    case SET_ADDRESS:
      return {...state, address: action.address};
    case SET_PHRASE:
      return {...state, phrase: action.phrase};
    case SIGNUP_ACCOUNT:
      return {...state, signup_data: action.signup_data};
    default:
      return state;
  }
};
