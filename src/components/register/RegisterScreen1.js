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
      use_fingerprint: false,
      fingerprint: '',
      error: '',
      errorPIN: '',
      errorConfPIN: '',
      errorFP: '',
      label:
        Platform.OS === 'ios' || Platform.OS === 'android' ? 'PIN' : 'Password',
    };
  }

  setTimer() {
    this.timer = setTimeout(this.props.onNextHandler, 1000);
  }

  gotoNext = () => {
    if (
      this.state.pin === '' ||
      this.state.errorPIN !== '' ||
      this.state.errorConfPIN !== ''
    ) {
      return false;
    }
    this.props.setSignupData({
      address: this.props.address,
      pin: encryptPass(this.state.pin),
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
          this.gotoNext();
        });
      }
    });
  };

  _onValidateConfPIN = () => {
    return this.state.pin.trim() === this.state.confirm_pin.trim();
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
            <Text style={s.textTitle}>Create New Wallet</Text>
            <Text style={[s.textBody, {marginBottom: 30}]}>
              Fill out the details below to create your secure wallet.
            </Text>

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
              <Text style={s.textDefault}>Already have an account? </Text>
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
