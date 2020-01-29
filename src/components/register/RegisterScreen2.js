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
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';
import ButtonPrimary from '../ButtonPrimary';

class RegisterScreen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      email: '',
      telegram_id: '',
      error: '',
      errorEmail: '',
    };
  }

  _onNameChanged = name => {
    this.setState({name: name.trim()});
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

  setTimer() {
    this.timer = setTimeout(this.props.onNextHandler, 1000);
  }

  _onButtonPress = e => {
    if (!this._onValidateEmail()) {
      return;
    }
    this.props.setSignupData({
      address: this.props.address,
      pin: this.props.signup_data.pin,
      use_fingerprint: this.props.signup_data.use_fingerprint,
      fingerprint: this.props.signup_data.fingerprint,
      is_phrase_saved: false,
      phrase_encrypt: this.props.signup_data.phrase_encrypt,
      email: this.state.email,
      name: this._onSetName(),
      telegram_id: this.state.telegram_id,
      referrer_id: null,
    });
    this.setState({isLoading: true}, () => this.setTimer());
  };

  render() {
    const {handleSubmit} = this.props;

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

            <View
              style={{
                marginTop: 6,
                flexDirection: 'row',
                justifyContent: 'left',
              }}>
              <Text
                style={s.textLink}
                onPress={() => this.props.onBackHandler()}>
                &#60; BACK
              </Text>
            </View>

            <View style={[s.inputField, {marginTop: 20}]}>
              <Text style={s.inputLabel}>FULL NAME (Optional)</Text>
              <TextInput
                label="Name"
                placeholder="What's your full name?"
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
                placeholder="you@example.com"
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
                style={[s.textErrorInput, !this.state.errorEmail && s.isHide]}>
                {this.state.errorEmail}
              </Text>
            </View>

            <View style={s.inputField}>
              <Text style={s.inputLabel}>TELEGRAM ID (Optional)</Text>
              <TextInput
                label="Telegram ID"
                placeholder="youtelegramid"
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
              <Text style={s.textHelp}>
                This will allow automatic VIP membership for token holders
              </Text>
            </View>

            <Text style={s.textError}>{this.props.error}</Text>

            <ButtonPrimary
              title="Create My Wallet"
              onPress={handleSubmit(this._onButtonPress)}
              disabled={this.state.isLoading}
            />
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
