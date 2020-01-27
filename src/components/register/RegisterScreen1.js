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
import {Field, reduxForm} from 'redux-form';
import {encryptPass} from '../../utils/utils';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';
import ButtonPrimary from '../../components/ButtonPrimary';

class RegisterScreen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      password: '',
      confirm_password: '',
      email: '',
      telegram_id: '',
      error: '',
      errorPass: '',
      errorConfPass: '',
      errorEmail: '',
    };
  }

  _onNameChanged = name => {
    this.setState({name: name.trim()});
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
        this.setState({errorConfPass: ''});
      }
    });
  };

  _onValidateConfPass = () => {
    return this.state.password.trim() === this.state.confirm_password.trim();
  };

  _onEmailChanged = email => {
    this.setState({email: email.trim()}, () => {
      if (!this._onValidateEmail()) {
        this.setState({
          errorEmail: 'Email address format is invalid.',
        });
      } else {
        this.setState({errorEmail: ''});
      }
    });
  };

  _onValidateEmail = () => {
    let regxp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.email.trim().length > 0) {
      if (!regxp.test(this.state.email.trim())) {
        return false;
      }
    }
    return true;
  };

  _onTelegramIDChanged = telegram_id => {
    this.setState({telegram_id: telegram_id.trim()});
  };

  _onSetName = () => {
    let random = Math.floor(100 + Math.random() * 900);
    return this.state.name === ''
      ? 'Wallet ' + random.toString()
      : this.state.name;
  };

  _onButtonPress = e => {
    if (
      !this._onValidatePass() ||
      !this._onValidateConfPass() ||
      !this._onValidateEmail()
    ) {
      return;
    }
    this.props.setSignupData({
      address: this.props.address,
      password: encryptPass(this.state.password),
      email: this.state.email,
      name: this._onSetName(),
      telegram_id: this.state.telegram_id,
      referrer_id: null,
    });
    this.props.onNextHandler();
  };

  render() {
    const {handleSubmit} = this.props;
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

            <View style={[s.inputField, {marginTop: 40}]}>
              <Text style={s.inputLabel}>FULL NAME (Optional)</Text>
              <TextInput
                label="Name"
                placeholder="Name"
                placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                style={[s.inputPrimary]}
                value={this.state.name}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                textContentType={'name'}
                onChangeText={this._onNameChanged}
              />
            </View>

            <View style={s.inputField}>
              <Text style={s.inputLabel}>EMAIL ADDRESS (Optional)</Text>
              <TextInput
                label="Email"
                placeholder="Email"
                placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                style={[
                  s.inputPrimary,
                  this.state.errorEmail ? s.inputError : '',
                ]}
                value={this.state.email}
                autoCorrect={false}
                textContentType={'emailAddress'}
                underlineColorAndroid="transparent"
                onChangeText={this._onEmailChanged}
              />
              <Text
                style={[
                  s.textErrorInput,
                  this.state.errorEmail ? s.isShow : s.isHide,
                ]}>
                {this.state.errorEmail}
              </Text>
            </View>

            <View style={s.inputField}>
              <Text style={s.inputLabel}>TELEGRAM ID (Optional)</Text>
              <TextInput
                label="Telegram ID"
                placeholder="Telegram ID"
                placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                style={[
                  s.inputPrimary,
                  this.state.errorPass ? s.inputError : '',
                ]}
                value={this.state.telegram_id}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onChangeText={this._onTelegramIDChanged}
              />
            </View>

            <Text style={s.textError}>{this.props.error}</Text>

            <ButtonPrimary
              title="Create My Wallet"
              onPress={handleSubmit(this._onButtonPress)}
              disabled={this.state.isLoading}
            />
            <View
              style={{
                marginTop: 6,
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
