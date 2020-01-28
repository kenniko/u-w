import React from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Spinner} from '../Spinner';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {encryptPass} from '../../utils/utils';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';
import ButtonPrimary from '../../components/ButtonPrimary';

class RegisterScreen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pin: '',
      confirm_pin: '',
      password: '',
      confirm_password: '',
      use_password: false,
      use_fingerprint: false,
      fingerprint: '',
      error: '',
      errorPIN: '',
      errorConfPIN: '',
      errorPass: '',
      errorConfPass: '',
      errorFP: '',
      autofocus_pin: false,
      autofocus_pass: false,
    };
  }

  setTimer() {
    this.timer = setTimeout(this.props.onNextHandler, 1000);
  }

  gotoNext = () => {
    if (this.state.errorPIN !== '' || this.state.errorConfPIN !== '') {
      return false;
    }
    if (this.state.use_password) {
      if (this.state.errorPass !== '' || this.state.errorConfPass !== '') {
        return false;
      }
    }
    this.props.setSignupData({
      address: this.props.address,
      pin: encryptPass(this.state.pin),
      use_password: this.state.use_password,
      password: this.state.use_password
        ? encryptPass(this.state.password)
        : null,
      use_fingerprint: this.state.use_fingerprint,
      fingerprint: null,
      is_phrase_saved: false,
      phrase_encrypt: null,
      email: null,
      name: null,
      telegram_id: null,
      referrer_id: null,
    });
    this.setState({isLoading: true}, () => this.setTimer());
  };

  _onValidatePIN = () => {
    return this.state.pin.trim().length > 5;
  };

  _onPINChanged = pin => {
    this.setState({pin: pin.trim()}, () => {
      if (!this._onValidatePIN()) {
        this.setState({errorPIN: 'PIN must be at least 6 characters.'});
      } else {
        this.setState({errorPIN: ''});
      }
    });
  };

  _onConfirmPINChanged = confirm_pin => {
    this.setState({confirm_pin: confirm_pin.trim()}, () => {
      if (!this._onValidateConfPIN()) {
        this.setState({
          errorConfPIN: 'Confirm PIN does not match the PIN.',
        });
      } else {
        this.setState({errorConfPIN: ''}, () => {
          if (!this.state.use_password) {
            this.gotoNext();
          }
        });
      }
    });
  };

  _onValidateConfPIN = () => {
    return this.state.pin.trim() === this.state.confirm_pin.trim();
  };

  _onValidatePass = () => {
    return this.state.password.trim().length > 7;
  };

  _onPasswordChanged = password => {
    this.setState({password: password.trim()}, () => {
      if (!this._onValidatePass()) {
        this.setState({errorPass: 'Password must be at least 8 characters.'});
      } else {
        this.setState({errorPass: ''});
      }
    });
  };

  _onConfirmPasswordChanged = confirm_password => {
    this.setState({confirm_password: confirm_password.trim()}, () => {
      if (!this._onValidateConfPass()) {
        this.setState({
          errorConfPass: 'Confirm password does not match the password.',
        });
      } else {
        this.setState({errorConfPass: ''}, () => {
          if (this.state.use_password) {
            this.gotoNext();
          }
        });
      }
    });
  };

  _onValidateConfPass = () => {
    return this.state.password.trim() === this.state.confirm_password.trim();
  };

  _onUsePass = () => {
    this.setState(
      {
        use_password: !this.state.use_password,
      },
      () => {
        this._onConfirmPINChanged(this.state.confirm_pin);
      },
    );
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
            enabled={Platform.OS == 'ios'}>
            <Spinner visible={this.state.isLoading} />
            <Text style={s.textTitle}>Create New Wallet</Text>
            <Text style={[s.textBody, {marginBottom: 30}]}>
              Fill out the details below to create your secure wallet.
            </Text>

            <View style={s.inputField}>
              <Text style={s.inputLabel}>PLEASE ENTER A PIN</Text>
              <TextInput
                label="PIN"
                placeholder="Enter 6 characters or more"
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
              <Text style={s.inputLabel}>CONFIRM PIN</Text>
              <TextInput
                label="Confirm PIN"
                placeholder="Confirm PIN"
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

            {this.state.use_password ? (
              <View>
                <View style={s.inputField}>
                  <Text style={s.inputLabel}>PASSWORD</Text>
                  <TextInput
                    label="Password"
                    placeholder="Enter 8 characters or more"
                    placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                    style={[
                      s.inputPrimary,
                      this.state.errorPass ? s.inputError : '',
                    ]}
                    value={this.state.password}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    textContentType={'password'}
                    onChangeText={this._onPasswordChanged}
                  />
                  <Text
                    style={[
                      s.textErrorInput,
                      this.state.errorPass ? s.isShow : s.isHide,
                    ]}>
                    {this.state.errorPass}
                  </Text>
                </View>

                <View style={s.inputField}>
                  <Text style={s.inputLabel}>CONFIRM PASSWORD</Text>
                  <TextInput
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                    style={[
                      s.inputPrimary,
                      this.state.errorConfPass ? s.inputError : '',
                    ]}
                    value={this.state.confirm_password}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    textContentType={'password'}
                    onChangeText={this._onConfirmPasswordChanged}
                  />
                  <Text
                    style={[
                      s.textErrorInput,
                      this.state.errorConfPass ? s.isShow : s.isHide,
                    ]}>
                    {this.state.errorConfPass}
                  </Text>
                </View>
              </View>
            ) : null}
            <View
              style={{
                marginTop: 6,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={s.textLink} onPress={this._onUsePass}>
                {this.state.use_password
                  ? 'No use password'
                  : 'Click here to use password instead'}
              </Text>
            </View>

            <View
              style={{
                marginTop: 8,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={s.textHelp}>Already have an account? </Text>
              <Text style={s.textLink} onPress={() => navigate('import')}>
                Import Wallet
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

RegisterScreen1.propTypes = {
  onNextHandler: PropTypes.func,
  onBackHandler: PropTypes.func,
};
RegisterScreen1.defaultProps = {};

export default reduxForm({
  form: 'register',
  destroyOnUnmount: true,
})(RegisterScreen1);
