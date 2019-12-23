import encrypto_decrypto from 'encrypto-decrypto';

export const encryptPass = str => {
  const encryptoDecrypto = new encrypto_decrypto({
    key: 'somekfitjfotifStringToUseAsAKey!',
    iv: 'nonceKSIEfj4Key!',
  });
  return encryptoDecrypto.encrypt(str);
};
