import React, {Component} from 'react';
import {View, Text, TextInput, Picker, Button} from 'react-native';
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
      address: '',
      password: '',
      error: null,
    };
  }

  componentDidMount() {
    if (this.props.loginData != null) {
      this.redirectTo('home');
    } else if (this.props.listWallet == null) {
      this.redirectTo('welcome');
    }
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

  _onaddressChanged = (address, i) => {
    this.setState({address: address});
  };

  _onpasswordChanged = password => {
    this.setState({password: password});
  };

  _isPasswordAllowed(data, password, callback) {
    data.password = encryptPass(password);
    data.is_phrase_saved = false;
    if (this.props.listWallet == null) {
      callback(false, data);
    } else {
      let wallets = this._getWalletStoredLocalByAddress(data.address);
      let allowed = false;
      for (let index = 0; index < wallets.length; index++) {
        if (decryptPass(wallets[index].password) === password) {
          data.is_phrase_saved = wallets[index].is_phrase_saved;
          allowed = true;
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

    let ini;
    // eslint-disable-next-line consistent-this
    ini = this;
    this.setState({isLoading: true}, () => {
      this.props.walletLogin(address, function(success, data) {
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
                error: 'Incorrect password',
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
    this.redirectTo('register');
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
          <Text style={styles.logoTextSubTitle}>React Native</Text>
        </View>

        <View style={styles.inputViewStyle}>
          <Picker
            selectedValue={this.state.address}
            onValueChange={this._onaddressChanged}>
            <Picker.Item label={'Select a wallet address'} />
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
        </View>

        <View style={styles.inputViewStyle}>
          <TextInput
            label="Password"
            placeholder="Password"
            style={styles.inputStyle}
            value={this.state.password}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType={'password'}
            underlineColorAndroid="transparent"
            onChangeText={this._onpasswordChanged}
          />
        </View>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <View style={styles.buttonStyle}>
          <Button
            title="Sign In"
            onPress={this._onButtonPress}
            disabled={this.state.isLoading}
          />
        </View>

        <View style={styles.buttonStyle}>
          <Button
            title="Create new wallet"
            onPress={() => navigate('register')}
            disabled={this.state.isLoading}
          />
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
    wallet: state.loginReducer.wallet,
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
    color: '#7d62d9',
    fontSize: 13,
    fontWeight: '500',
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
    fontSize: 13,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 50,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#e03131',
  },
  footerViewStyle: {
    paddingLeft: 28,
    paddingRight: 28,
    marginTop: 15,
    flexDirection: 'column',
  },
  footerTextStyle: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#8e8e8e',
  },
};
