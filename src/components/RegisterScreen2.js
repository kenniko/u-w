import React, {Component} from 'react';
import {View, Text, TextInput, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Spinner} from './Spinner';
import {NavigationActions, StackActions} from 'react-navigation';
import * as storage from '../storage/storage';

class RegisterScreen2 extends Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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

  _onButtonPress = e => {
    this.setState({isLoading: true}, () => {
      this.props.saveRegister(this.props.signup_data);
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.wallet !== this.props.wallet) {
      this.setState({isLoading: false}, () => {
        let wallet = this.props.wallet;
        wallet.password = this.props.signup_data.password;
        wallet.is_phrase_saved = this.props.is_phrase_saved;
        storage.saveWalletList(wallet);
        storage.saveLoginWallet(wallet);
        this.props.setAddress('');
        this.props.setPhrase('');
        this.props.setSignupAccount({});
        this.props.setLoginData(wallet);
        this.redirectTo('home');
      });
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <View style={styles.containerStyle}>
        <Spinner visible={this.state.isLoading} />
        <View style={styles.logoViewStyle}>
          <Text style={styles.logoTextTitle}>Unity Wallet</Text>
          <Text style={styles.logoTextSubTitle}>React Native</Text>
        </View>

        <View style={styles.buttonStyle}>
          <Button
            title="Continue without backup"
            onPress={handleSubmit(this._onButtonPress)}
            disabled={this.state.isLoading}
          />
        </View>

        <Text style={styles.errorTextStyle}>{this.props.error}</Text>

        <View style={[styles.footerViewStyle]}>
          <Text style={styles.footerTextStyle}>
            Sample UI v3.0.0 / SDK v.3.0.99
          </Text>
        </View>
      </View>
    );
  }
}

export default reduxForm({
  form: 'register',
  destroyOnUnmount: false,
})(RegisterScreen2);

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
