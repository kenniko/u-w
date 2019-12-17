import {INIT_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  wallet: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_SIGNUP:
      return {...state, ...INITIAL_STATE};
    case SIGNUP_SUCCESS:
      return {...state, ...INITIAL_STATE, wallet: action.payload};
    case SIGNUP_FAIL:
      return {...state, ...INITIAL_STATE, error: action.payload};
    default:
      return state;
  }
};
