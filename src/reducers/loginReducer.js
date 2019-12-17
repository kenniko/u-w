import {INIT_LOGIN, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  wallet: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {...state, ...INITIAL_STATE};
    case LOGIN_SUCCESS:
      return {...state, ...INITIAL_STATE, wallet: action.payload};
    case LOGIN_FAIL:
      return {...state, ...INITIAL_STATE, error: action.payload};
    default:
      return state;
  }
};
