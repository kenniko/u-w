const CryptoJS = require('crypto-js');

export const encryptPass = str => {
  return CryptoJS.AES.encrypt(
    str,
    'somekfitjfotifStringToUseAsAKey',
  ).toString();
};

export const decryptPass = str => {
  let bytes = CryptoJS.AES.decrypt(str, 'somekfitjfotifStringToUseAsAKey');
  return bytes.toString(CryptoJS.enc.Utf8);
};
