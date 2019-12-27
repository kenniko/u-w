import {INIT_IMPORT, IMPORT_GOTO, IMPORT_DATA} from '../actions/types';
const INITIAL_STATE = {
  import_screen: 1,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_IMPORT:
      return {...state, import_screen: 1};
    case IMPORT_GOTO:
      return {...state, import_screen: action.import_screen};
    case IMPORT_DATA:
      return {...state, import_data: action.import_data};
    default:
      return state;
  }
};
