import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {Spinner} from '../Spinner';
import {NavigationActions, StackActions} from 'react-navigation';

class RegisterScreen2 extends Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
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
    let ini;
    // eslint-disable-next-line consistent-this
    ini = this;
    this.setState({isLoading: true}, () => {
      this.props.saveRegister(this.props.signup_data, function(success, data) {
        if (!success) {
          ini.setState({
            isLoading: false,
            error: data,
          });
        } else {
          data.password = ini.props.signup_data.password;
          data.is_phrase_saved = ini.props.is_phrase_saved;
          ini.props.setAddress(null);
          ini.props.setPhrase(null);
          ini.props.setSignupData(null);
          ini.props.onBack(1);
          ini.props.setLoginData(data);
          ini.props.setWalletList(ini.props.listWallet, data);
          ini.redirectTo('home');
        }
      });
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
            <Text style={styles.logoTextTitle}>
              Your secure wallet has been successfully created.
            </Text>
            <Text style={styles.logoTextSubTitle}>
              Below is your Backup Seed Phrase and write or copy this somewhere
              secure that only you can access.
            </Text>
          </View>
          <View style={styles.seedViewStyle}>
            <TouchableOpacity
              onPress={() => Clipboard.setString(this.props.phrase)}>
              <Text style={styles.seedTextSubTitle}>{this.props.phrase}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <View style={styles.buttonStyle}>
            <Button
              title="Continue without backup"
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

export default reduxForm({
  form: 'register',
  destroyOnUnmount: true,
})(RegisterScreen2);

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
  },
  logoViewStyle: {
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  seedViewStyle: {
    marginTop: 35,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 20,
    backgroundColor: '#d8d8d8',
    alignItems: 'center',
  },
  logoTextTitle: {
    color: '#7d62d9',
    fontSize: 20,
    fontWeight: '500',
    alignItems: 'center',
    textAlign: 'center',
  },
  logoTextSubTitle: {
    color: '#7d62d9',
    fontSize: 15,
    fontWeight: '500',
    alignItems: 'center',
    textAlign: 'center',
  },
  seedTextSubTitle: {
    color: '#003333',
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    marginTop: 20,
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
