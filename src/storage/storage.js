import storage from './index';

// key storage
// Note: Do not use underscore("_") in key!
export const LOGIN_DATA = 'loginData';
export const WALLET_LIST = 'walletList';

export const saveWalletList = wallet => {
  // load
  storage
    .load({
      key: WALLET_LIST,
      id: '500',
      autoSync: false,
    })
    .then(list => {
      list.push(wallet);
      storage.save({
        key: WALLET_LIST,
        id: '500',
        data: list,
      });
    })
    .catch(_err => {
      storage.save({
        key: WALLET_LIST,
        id: '500',
        data: [wallet],
      });
    });
};

export const saveLoginWallet = wallet => {
  storage.save({
    key: LOGIN_DATA,
    id: '500',
    autoSync: false,
    data: wallet,
  });
};

export const getLoginData = callback => {
  storage
    .load({
      key: LOGIN_DATA,
      id: '500',
      autoSync: false,
    })
    .then(wallet => {
      callback(wallet);
    })
    .catch(_err => {
      callback(null);
    });
};

export const getWalletList = callback => {
  storage
    .load({
      key: WALLET_LIST,
      id: '500',
      autoSync: false,
    })
    .then(wallets => {
      callback(wallets);
    })
    .catch(_err => {
      callback(null);
    });
};

export const checkWalletList = callback => {
  storage
    .load({
      key: WALLET_LIST,
      id: '500',
      autoSync: false,
    })
    .then(wallet => {
      callback(true);
    })
    .catch(_err => {
      callback(false);
    });
};
