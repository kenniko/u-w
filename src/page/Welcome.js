import React, {Component} from 'react';
import {View, Text, TextInput, Image, Button} from 'react-native';
import {Spinner} from '../components/Spinner';
import {NavigationActions, StackActions} from 'react-navigation';
import * as storage from '../storage/storage';

class Welcome extends Component {
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

  componentDidMount() {
    if (this.props.loginData != null) {
      this.redirectTo('home');
    } else if (this.props.listWallet != null) {
      this.redirectTo('login');
    }
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

  _onButtonCreatePress = () => {
    this.redirectTo('register');
  };

  _onButtonImportPress = () => {
    this.redirectTo('import');
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Spinner visible={this.state.isLoading} />
        <View style={styles.logoViewStyle}>
          <Text style={styles.logoTextTitle}>Welcome to Unity Wallet</Text>
          <Text style={styles.logoTextSubTitle}>React Native</Text>
        </View>

        <View style={styles.buttonStyle}>
          <Button
            title="Create New Wallet"
            onPress={this._onButtonCreatePress}
            disabled={this.state.isLoading}
          />
        </View>

        <Text style={styles.orTextStyle}>OR</Text>

        <View style={styles.buttonStyle}>
          <Button
            title="Import Wallet"
            onPress={this._onButtonImportPress}
            disabled={this.state.isLoading}
          />
        </View>

        <Text style={styles.errorTextStyle}>{this.props.error}</Text>

        <View style={[styles.footerViewStyle]}>
          <Text style={styles.footerTextStyle}>Unity Wallet v1.0.0</Text>
        </View>
      </View>
    );
  }
}

export default Welcome;

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
    marginTop: 30,
    marginBottom: 30,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#e03131',
  },
  orTextStyle: {
    alignSelf: 'center',
    fontSize: 14,
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
