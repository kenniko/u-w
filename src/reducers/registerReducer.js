import {
  INIT_SIGNUP,
  SIGNUP_NEXT,
  SIGNUP_BACK,
  SET_ADDRESS,
  SET_PHRASE,
  SIGNUP_DATA,
  SAVED_PHRASE_CONFIRM,
} from '../actions/types';
const INITIAL_STATE = {
  signup_data: null,
  screen: 1,
  address: null,
  phrase: null,
  is_phrase_saved: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_SIGNUP:
      return {...state, signup_data: null, screen: 1};
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
    case SAVED_PHRASE_CONFIRM:
      return {...state, is_phrase_saved: action.is_phrase_saved};
    default:
      return state;
  }
};
