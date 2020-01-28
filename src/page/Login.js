import React, {Component} from 'react';
import {Platform, View, Text, TextInput, Picker, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReduxActions from '../actions';
import {Spinner} from '../components/Spinner';
import {NavigationActions, StackActions} from 'react-navigation';
import {encryptPass, decryptPass} from '../utils/utils';

class Login extends Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showDeleteAccount: false,
      address: '',
      password: '',
      error: '',
      errorPass: '',
      errorAddress: '',
      label:
        Platform.OS === 'ios' || Platform.OS === 'android' ? 'PIN' : 'Password',
    };
    this.checkWallets = this.checkWallets.bind(this);
  }

  checkWallets() {
    if (this.props.loginData != null) {
      this.redirectTo('home');
    } else if (this.props.listWallet == null) {
      this.redirectTo('welcome');
    } else if (this.props.listWallet.length < 1) {
      this.redirectTo('welcome');
    } else {
      this.props.initLogin();
    }
  }

  componentDidMount() {
    this.checkWallets();
  }

  redirectTo(page, params) {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: page,
            params: params,
          }),
        ],
      }),
    );
  }

  setTimer() {
    this.timer = setTimeout(this.checkWallets, 1000);
  }

  _onDeleteAccount = () => {
    if (this.state.address !== '') {
      this.props.deleteWalletByAddress(
        this.props.listWallet,
        this.state.address,
      );
      this.setTimer();
    }
  };

  _onValidateAddress = () => {
    return this.state.address.trim().length > 0;
  };

  _onAddressChanged = (address, i) => {
    this.setState(
      {
        address: address,
        showDeleteAccount: address !== '' ? true : false,
      },
      () => {
        if (!this._onValidateAddress()) {
          this.setState({errorAddress: 'Required'});
        } else {
          this.setState({errorAddress: ''});
        }
      },
    );
  };

  _onValidatePass = () => {
    return this.state.password.trim().length > 1;
  };

  _onPasswordChanged = password => {
    this.setState({password: password.trim()}, () => {
      if (!this._onValidatePass()) {
        this.setState({errorPass: 'Required'});
      } else {
        this.setState({errorPass: ''});
      }
    });
  };

  _isPasswordAllowed(data, password, callback) {
    data.is_phrase_saved = false;
    data.pin = null;
    data.fingerprint = null;
    data.use_fingerprint = false;
    data.phrase_encrypt = null;
    if (this.props.listWallet == null) {
      callback(false, data);
    } else {
      let wallets = this._getWalletStoredLocalByAddress(data.address);
      let allowed = false;
      for (let index = 0; index < wallets.length; index++) {
        if (decryptPass(wallets[index].pin) === password) {
          allowed = true;
          data.pin = encryptPass(wallets[index].pin);
          data.is_phrase_saved = wallets[index].is_phrase_saved;
          data.use_fingerprint = wallets[index].use_fingerprint;
          data.fingerprint = wallets[index].fingerprint;
          data.phrase_encrypt = wallets[index].phrase_encrypt;
        }
      }
      callback(allowed, data);
    }
  }

  _getWalletStoredLocalByAddress(address) {
    if (this.props.listWallet == null) {
      return [];
    } else {
      let local = this.props.listWallet.filter(function(wallet) {
        return wallet.address === address;
      });
      return local;
    }
  }

  _onButtonPress = () => {
    const {address, password} = this.state;
    if (!this._onValidatePass() || !this._onValidateAddress()) {
      return;
    }
    let ini;
    // eslint-disable-next-line consistent-this
    ini = this;
    this.setState({isLoading: true}, () => {
      this.props.getWalletFromServ(address, function(success, data) {
        if (!success) {
          ini.setState({
            isLoading: false,
            error: data,
          });
        } else {
          ini._isPasswordAllowed(data, password, function(s, d) {
            if (!s) {
              ini.setState({
                isLoading: false,
                error: 'Incorrect ' + ini.state.label,
              });
            } else {
              ini.setState(
                {
                  isLoading: false,
                  error: null,
                },
                () => {
                  ini.props.setLoginData(d);
                  ini.props.setWalletList(ini.props.listWallet, d);
                  ini.redirectTo('home');
                },
              );
            }
          });
        }
      });
    });
  };

  _onButtonCreatePress = () => {
    this.props.onBack(1);
    this.redirectTo('create');
  };

  render() {
    const {navigate} = this.props.navigation;
    let dropdown = this.props.listWallet;
    if (dropdown == null) {
      dropdown = [];
    }
    return (
      <View style={styles.containerStyle}>
        <Spinner visible={this.state.isLoading} />
        <View style={styles.logoViewStyle}>
          <Text style={styles.logoTextTitle}>Unity Wallet</Text>
        </View>

        <View style={styles.logoViewStyle}>
          <Text style={styles.logoTextSubTitle}>
            Sign in to your account or{' '}
          </Text>
          <Text
            style={styles.linkTextSubTitle}
            disabled={this.state.isLoading}
            onPress={() => navigate('import')}>
            Import Account
          </Text>
        </View>

        <View style={styles.inputViewStyle}>
          {this.state.showDeleteAccount ? (
            <Text
              style={styles.deleteText}
              disabled={this.state.isLoading}
              onPress={() => this._onDeleteAccount()}>
              Delete this account
            </Text>
          ) : null}
          <Picker
            selectedValue={this.state.address}
            onValueChange={this._onAddressChanged}>
            <Picker.Item value={''} label={'Select a wallet address'} />
            {dropdown.map((wallet, index) => {
              return (
                <Picker.Item
                  label={wallet.name + ' : ' + wallet.address}
                  value={wallet.address}
                  key={index}
                />
              );
            })}
          </Picker>
          <Text style={styles.errorText}>{this.state.errorAddress}</Text>
        </View>

        <View style={styles.inputViewStyle}>
          <TextInput
            label={this.state.label}
            placeholder={this.state.label}
            style={styles.inputStyle}
            value={this.state.password}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType={'password'}
            keyboardType={'number-pad'}
            underlineColorAndroid="transparent"
            onChangeText={this._onPasswordChanged}
          />
          <Text style={styles.errorText}>{this.state.errorPass}</Text>
        </View>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <View style={styles.buttonStyle}>
          <Button
            title="Continue"
            onPress={this._onButtonPress}
            disabled={this.state.isLoading}
          />
        </View>

        <View style={styles.logoViewStyle}>
          <Text style={styles.logoTextSubTitle}>Or</Text>
        </View>

        <View style={styles.linkStyle}>
          <Text
            style={styles.linkTextSubTitle}
            disabled={this.state.isLoading}
            onPress={() => navigate('create')}>
            Create new wallet
          </Text>
        </View>

        <View style={[styles.footerViewStyle]}>
          <Text style={styles.footerTextStyle}>Unity Wallet v1.0.0</Text>
        </View>
      </View>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    error: state.loginReducer.error,
    listWallet: state.loginReducer.listWallet,
    loginData: state.loginReducer.loginData,
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
  },
  logoViewStyle: {
    marginTop: 35,
    marginBottom: 5,
    alignItems: 'center',
  },
  logoTextTitle: {
    color: '#7d62d9',
    fontSize: 30,
    fontWeight: '600',
  },
  logoTextSubTitle: {
    color: '#8e8e8e',
    fontSize: 13,
    fontWeight: '500',
  },
  linkTextSubTitle: {
    color: '#7d62d9',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorText: {
    color: '#a94442',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
  },
  deleteText: {
    color: '#a94442',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
  },
  inputViewStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 28,
    marginRight: 28,
    marginTop: 8,
  },
  inputStyle: {
    alignItems: 'center',
    fontSize: 13,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 30,
  },
  linkStyle: {
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 30,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#e03131',
  },
  footerViewStyle: {
    paddingLeft: 28,
    paddingRight: 28,
    marginTop: 45,
    flexDirection: 'column',
  },
  footerTextStyle: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#8e8e8e',
  },
};
