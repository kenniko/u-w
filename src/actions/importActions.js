import {INIT_IMPORT, IMPORT_GOTO, IMPORT_DATA} from './types';
import {API} from '../utils/axios';

export const initImport = () => {
  return {type: INIT_IMPORT};
};

export const onGoto = import_screen => {
  return dispatch => {
    dispatch({
      type: IMPORT_GOTO,
      import_screen: import_screen,
    });
  };
};

export const setImportData = import_data => {
  return dispatch => {
    dispatch({
      type: IMPORT_DATA,
      import_data: import_data,
    });
  };
};
