import React from 'react';
import {View, Text, TextInput, ScrollView, Button} from 'react-native';
import {Spinner} from './Spinner';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {encryptPass} from '../utils/utils';

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
      error: null,
    };
  }

  _onNameChanged = name => {
    this.setState({name: name});
  };

  _onPasswordChanged = password => {
    this.setState({password: password});
  };

  _onConfirmPasswordChanged = confirm_password => {
    this.setState({confirm_password: confirm_password});
  };

  _onEmailChanged = email => {
    this.setState({email: email});
  };

  _onTelegramIDChanged = telegram_id => {
    this.setState({telegram_id: telegram_id});
  };

  _onSetName = () => {
    let random = Math.floor(100 + Math.random() * 900);
    return this.state.name === ''
      ? 'Wallet ' + random.toString()
      : this.state.name;
  };

  _onButtonPress = e => {
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
    const {goBack} = this.props.navigation;

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.containerStyle}>
          <Spinner visible={this.state.isLoading} />
          <View style={styles.logoViewStyle}>
            <Text style={styles.logoTextTitle}>Unity Wallet</Text>
            <Text style={styles.logoTextSubTitle}>React Native</Text>
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
  onNextHandler: PropTypes.func,
  onBackHandler: PropTypes.func,
};
ImportScreen2.defaultProps = {};

export default reduxForm({
  form: 'register',
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
    textAlign: 'center',
  },
  logoTextSubTitle: {
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
