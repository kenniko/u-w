import React from 'react';
import {View, Text, TextInput, ScrollView, Button} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {Spinner} from '../Spinner';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {encryptPass} from '../../utils/utils';

class ImportScreen2 extends React.Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

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
    let ini;
    let pass = encryptPass(this.state.password);
    // eslint-disable-next-line consistent-this
    ini = this;
    this.setState({isLoading: true}, () => {
      this.props.saveRegister(
        {
          address: this.props.address,
          email: this.state.email,
          name: this._onSetName(),
          telegram_id: this.state.telegram_id,
          referrer_id: null,
        },
        function(success, data) {
          if (!success) {
            ini.setState({
              isLoading: false,
              error: data,
            });
          } else {
            data.password = pass;
            data.is_phrase_saved = true;
            ini.props.setAddress(null);
            ini.props.setPhrase(null);
            ini.props.setImportData(null);
            ini.props.setLoginData(data);
            ini.props.setWalletList(ini.props.listWallet, data);
            ini.redirectTo('home');
          }
        },
      );
    });
  };

  render() {
    const {handleSubmit} = this.props;
    const {goBack} = this.props.navigation;

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.containerStyle}>
          <Spinner visible={this.state.isLoading} />
          <View style={styles.logoViewStyle}>
            <Text style={styles.logoTextTitle}>Import Wallet</Text>
          </View>
          <View style={styles.logoViewStyle}>
            <Text style={styles.logoTextSubTitle}>
              Fill out the details below.
            </Text>
          </View>

          <View style={styles.inputViewStyle}>
            <TextInput
              label="Password"
              placeholder="Password"
              style={styles.inputStyle}
              value={this.state.password}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              textContentType={'password'}
              onChangeText={this._onPasswordChanged}
            />
            <Text style={styles.errorText}>{this.state.errorPass}</Text>
          </View>

          <View style={styles.inputViewStyle}>
            <TextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              style={styles.inputStyle}
              value={this.state.confirm_password}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              textContentType={'password'}
              onChangeText={this._onConfirmPasswordChanged}
            />
            <Text style={styles.errorText}>{this.state.errorConfPass}</Text>
          </View>

          <View style={styles.inputViewStyle}>
            <TextInput
              label="Name"
              placeholder="Name"
              style={styles.inputStyle}
              value={this.state.name}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              textContentType={'name'}
              onChangeText={this._onNameChanged}
            />
          </View>

          <View style={styles.inputViewStyle}>
            <TextInput
              label="Email"
              placeholder="Email"
              style={styles.inputStyle}
              value={this.state.email}
              autoCorrect={false}
              textContentType={'emailAddress'}
              underlineColorAndroid="transparent"
              onChangeText={this._onEmailChanged}
            />
            <Text style={styles.errorText}>{this.state.errorEmail}</Text>
          </View>

          <View style={styles.inputViewStyle}>
            <TextInput
              label="Telegram ID"
              placeholder="Telegram ID"
              style={styles.inputStyle}
              value={this.state.telegram_id}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              onChangeText={this._onTelegramIDChanged}
            />
          </View>

          <Text style={styles.errorTextStyle}>{this.props.error}</Text>

          <View style={styles.buttonStyle}>
            <Button
              title="Continue"
              onPress={handleSubmit(this._onButtonPress)}
              disabled={this.state.isLoading}
            />
          </View>

          <View style={styles.buttonStyle}>
            <Button
              title="Back"
              onPress={() => goBack()}
              disabled={this.state.isLoading}
            />
          </View>

          <View style={[styles.footerViewStyle]}>
            <Text style={styles.footerTextStyle}>Unity Wallet v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

ImportScreen2.propTypes = {
  onGoToHandler: PropTypes.func,
};
ImportScreen2.defaultProps = {};

export default reduxForm({
  form: 'import',
  destroyOnUnmount: true,
})(ImportScreen2);

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
