import {encrypt, decrypt} from 'react-native-simple-encryption';

export const encryptPass = str => {
  return encrypt('somekfitjfotifStringToUseAsAKey', str);
};
