import {
  INIT_SIGNUP,
  SIGNUP_NEXT,
  SIGNUP_BACK,
  SET_ADDRESS,
  SET_PHRASE,
  SIGNUP_DATA,
} from '../actions/types';
const INITIAL_STATE = {
  signup_data: null,
  screen: 1,
  address: null,
  phrase: null,
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
    default:
      return state;
  }
};
