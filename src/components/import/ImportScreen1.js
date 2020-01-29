import React from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {Spinner} from '../Spinner';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {address, encryptSeed} from '@waves/ts-lib-crypto';
import {encryptPass} from '../../utils/utils';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';
import ButtonPrimary from '../../components/ButtonPrimary';

class ImportScreen1 extends React.Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      phrase: '',
      address: '',
      error: '',
      errorPhrase: '',
      errorAddress: '',
      pin: '',
      confirm_pin: '',
      use_fingerprint: false,
      fingerprint: '',
      errorPIN: '',
      errorConfPIN: '',
      errorFP: '',
      label:
        Platform.OS === 'ios' || Platform.OS === 'android' ? 'PIN' : 'Password',
    };
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

  _onValidatePhrase = () => {
    return this.state.phrase.trim().length > 0;
  };

  _onPhraseChanged = phrase => {
    this.setState(
      {
        phrase: phrase.trim(),
        address: address(phrase.trim()),
      },
      () => {
        if (!this._onValidatePhrase()) {
          this.setState({
            errorPhrase: 'Required',
          });
        } else {
          this.setState({errorPhrase: ''});
        }
      },
    );
  };

  _onValidateAddress = () => {
    return this.state.address.trim().length > 0;
  };

  _onAddressChanged = addr => {
    this.setState({address: addr}, () => {
      if (!this._onValidateAddress()) {
        this.setState({
          errorAddress: 'Required',
        });
      } else {
        this.setState({errorAddress: ''});
      }
    });
  };

  setTimer() {
    this.timer = setTimeout(this.props.onNextHandler, 500);
  }

  _onValidatePIN = () => {
    return this.state.pin.trim().length > 7;
  };

  _onPINChanged = pin => {
    this.setState({pin: pin.trim()}, () => {
      if (!this._onValidatePIN()) {
        this.setState({
          errorPIN: this.state.label + ' must be at least 8 characters.',
        });
      } else {
        this.setState({errorPIN: ''});
      }
    });
  };

  _onConfirmPINChanged = confirm_pin => {
    this.setState({confirm_pin: confirm_pin.trim()}, () => {
      if (!this._onValidateConfPIN()) {
        this.setState({
          errorConfPIN:
            'Confirm ' +
            this.state.label +
            ' does not match the ' +
            this.state.label,
        });
      } else {
        this.setState({errorConfPIN: ''}, () => {
          this._onButtonPress();
        });
      }
    });
  };

  _onValidateConfPIN = () => {
    return this.state.pin.trim() === this.state.confirm_pin.trim();
  };

  _onButtonPress = () => {
    if (
      this.state.address === '' ||
      this.state.phrase === '' ||
      this.state.errorAddress !== '' ||
      this.state.errorPhrase !== ''
    ) {
      return false;
    }
    if (
      this.state.pin === '' ||
      this.state.errorPIN !== '' ||
      this.state.errorConfPIN !== ''
    ) {
      return false;
    }

    let ini;
    // eslint-disable-next-line consistent-this
    ini = this;
    this.props.setAddress(this.state.address);
    this.props.setPhrase(this.state.phrase);
    this.setState({isLoading: true}, () => {
      this.props.getWalletFromServ(this.state.address, function(success, data) {
        if (!success) {
          ini.props.setImportData({
            address: ini.props.address,
            pin: encryptPass(ini.state.pin),
            use_fingerprint: ini.state.use_fingerprint,
            fingerprint: null,
            is_phrase_saved: true,
            phrase_encrypt: encryptSeed(ini.state.phrase, ini.state.pin),
            email: null,
            name: null,
            telegram_id: null,
            referrer_id: null,
          });
          ini.props.onGoToHandler(2);
        } else {
          data.pin = encryptPass(ini.state.pin);
          data.use_fingerprint = ini.state.use_fingerprint;
          data.fingerprint = null;
          data.is_phrase_saved = true;
          data.phrase_encrypt = encryptSeed(ini.state.phrase, ini.state.pin);
          ini.props.setAddress(null);
          ini.props.setPhrase(null);
          ini.props.setImportData(null);
          ini.props.setLoginData(data);
          ini.props.setWalletList(ini.props.listWallet, data);
          ini.redirectTo('dashboard');
        }
      });
    });
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={[s.container, s.conCenter]}>
          <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}>
            <Spinner visible={this.state.isLoading} />
            <Text style={s.textTitle}>Import Wallet</Text>
            <View
              style={{
                marginBottom: 30,
                flexDirection: 'row',
                justifyContent: 'left',
              }}>
              <Text style={s.textBody}>
                Import your wallet from backup seed phrase or{' '}
              </Text>
              <Text style={s.textLink} onPress={() => navigate('signin')}>
                Go Back
              </Text>
            </View>

            <View style={s.inputField}>
              <Text style={s.inputLabel}>BACKUP SEED PHRASE</Text>
              <TextInput
                label="BACKUP SEED PHRASE"
                placeholder="Enter your Backup Seed Phrase"
                placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                style={[
                  s.inputPrimary,
                  this.state.errorPhrase ? s.inputError : '',
                ]}
                value={this.state.phrase}
                autoCorrect={false}
                autoFocus={true}
                underlineColorAndroid="transparent"
                textContentType={'name'}
                onChangeText={this._onPhraseChanged}
              />
              <Text
                style={[s.textErrorInput, !this.state.errorPhrase && s.isHide]}>
                {this.state.errorPhrase}
              </Text>
            </View>

            <View style={s.inputField}>
              <Text style={s.inputLabel}>WALLET ADDRESS</Text>
              <TextInput
                label="WALLET ADDRESS"
                placeholder="Wallet Address"
                placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                style={[
                  s.inputPrimary,
                  this.state.errorAddress ? s.inputError : '',
                ]}
                value={this.state.address}
                autoCorrect={false}
                autoFocus={false}
                editable={false}
                underlineColorAndroid="transparent"
                textContentType={'username'}
                onChangeText={this._onAddressChanged}
              />
              <Text
                style={[
                  s.textErrorInput,
                  !this.state.errorAddress && s.isHide,
                ]}>
                {this.state.errorAddress}
              </Text>
            </View>

            <View style={s.inputField}>
              <Text style={s.inputLabel}>
                {Platform.OS === 'ios' || Platform.OS === 'android'
                  ? 'PLEASE ENTER A PIN'
                  : 'PLEASE ENTER A PASSWORD'}
              </Text>
              <TextInput
                label={
                  Platform.OS === 'ios' || Platform.OS === 'android'
                    ? 'PIN'
                    : 'PASSWORD'
                }
                placeholder="Enter 8 characters or more"
                placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                style={[
                  s.inputPrimary,
                  this.state.errorPIN ? s.inputError : '',
                ]}
                value={this.state.pin}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                keyboardType={'number-pad'}
                textContentType={'password'}
                onChangeText={this._onPINChanged}
              />
              <Text
                style={[
                  s.textErrorInput,
                  this.state.errorPIN ? s.isShow : s.isHide,
                ]}>
                {this.state.errorPIN}
              </Text>
            </View>

            <View style={s.inputField}>
              <Text style={s.inputLabel}>
                {Platform.OS === 'ios' || Platform.OS === 'android'
                  ? 'CONFIRM PIN'
                  : 'CONFIRM PASSWORD'}
              </Text>
              <TextInput
                label={
                  Platform.OS === 'ios' || Platform.OS === 'android'
                    ? 'CONFIRM PIN'
                    : 'CONFIRM PASSWORD'
                }
                placeholder={
                  Platform.OS === 'ios' || Platform.OS === 'android'
                    ? 'Re-enter your PIN'
                    : 'Re-enter your password'
                }
                placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                style={[
                  s.inputPrimary,
                  this.state.errorConfPIN ? s.inputError : '',
                ]}
                value={this.state.confirm_pin}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                keyboardType={'number-pad'}
                textContentType={'password'}
                onChangeText={this._onConfirmPINChanged}
              />
              <Text
                style={[
                  s.textErrorInput,
                  this.state.errorConfPIN ? s.isShow : s.isHide,
                ]}>
                {this.state.errorConfPIN}
              </Text>
            </View>

            <Text style={s.textError}>{this.props.error}</Text>

            <View
              style={{
                marginTop: 6,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={s.textDefault}>Don't have an account? </Text>
              <Text style={s.textLink} onPress={() => navigate('create')}>
                Create a new wallet
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

ImportScreen1.propTypes = {
  onGoToHandler: PropTypes.func,
};
ImportScreen1.defaultProps = {};

export default reduxForm({
  form: 'import',
  destroyOnUnmount: true,
})(ImportScreen1);

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
  errorText: {
    color: '#a94442',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
  },
  linkTextSubTitle: {
    color: '#7d62d9',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
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
