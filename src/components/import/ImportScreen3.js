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
import {NavigationActions, StackActions} from 'react-navigation';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';

class ImportScreen3 extends React.Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pin: '',
      confirm_pin: '',
      error: '',
      errorPIN: '',
      errorConfPIN: '',
      label:
        Platform.OS === 'ios' || Platform.OS === 'android' ? 'PIN' : 'Password',
    };
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
    this.timer = setTimeout(this.redirectTo('dashboard'), 1000);
  }

  _onButtonPress = () => {
    if (
      this.state.pin === '' ||
      this.state.errorPIN !== '' ||
      this.state.errorConfPIN !== ''
    ) {
      return false;
    }
    this.setState({isLoading: true}, () => {
      let data = this.props.import_data;
      data.pin = encryptPass(this.state.pin);
      this.props.setAddress(null);
      this.props.setPhrase(null);
      this.props.setImportData(null);
      this.props.setLoginData(data);
      this.props.setWalletList(this.props.listWallet, data);
      this.setState({isLoading: true}, () => this.setTimer());
    });
  };

  render() {
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
                autoFocus={true}
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
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

ImportScreen3.propTypes = {
  onGoToHandler: PropTypes.func,
};
ImportScreen3.defaultProps = {};

export default reduxForm({
  form: 'import',
  destroyOnUnmount: true,
})(ImportScreen3);

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
  errorText: {
    color: '#a94442',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
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
