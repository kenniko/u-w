import React from 'react';
import {View, Text, TextInput, ScrollView, Button} from 'react-native';
import {Spinner} from '../Spinner';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {encryptPass} from '../../utils/utils';
import {NavigationActions, StackActions} from 'react-navigation';

class ImportScreen3 extends React.Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      password: '',
      confirm_password: '',
      error: null,
    };
  }

  _onPasswordChanged = password => {
    this.setState({password: password});
  };

  _onConfirmPasswordChanged = confirm_password => {
    this.setState({confirm_password: confirm_password});
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

  _onButtonPress = e => {
    this.setState({isLoading: true}, () => {
      let data = this.props.import_data;
      data.password = encryptPass(this.state.password);
      data.is_phrase_saved = true;
      this.props.setAddress(null);
      this.props.setPhrase(null);
      this.props.setImportData(null);
      this.props.setLoginData(data);
      this.props.setWalletList(this.props.listWallet, data);
      this.redirectTo('home');
    });
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.containerStyle}>
          <Spinner visible={this.state.isLoading} />
          <View style={styles.logoViewStyle}>
            <Text style={styles.logoTextTitle}>Import Wallet</Text>
          </View>
          <View style={styles.logoViewStyle}>
            <Text style={styles.logoTextSubTitle}>
              Fill out the details below to continue to your secure wallet.
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
              onPress={() => this.props.onGoToHandler(1)}
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
