import React, {Component} from 'react';
import {View, Text, TextInput, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import {initLogin, walletLogin} from '../actions';
import {Spinner} from '../components/Spinner';
import storage from '../storage';
import {NavigationActions, StackActions} from 'react-navigation';

class Login extends Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      address: '',
      password: '',
    };
  }

  componentDidMount() {
    storage
      .load({
        key: 'wallet_list',
        autoSync: true,
        syncInBackground: true,
      })
      .then(wallet => {
        this.props.initLogin();
      })
      .catch(_err => {
        this.redirectTo('welcome');
      });
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

  _onaddressChanged = address => {
    this.setState({address});
  };

  _onpasswordChanged = password => {
    this.setState({password});
  };

  _onButtonPress = () => {
    const {address, password} = this.state;
    this.setState({isLoading: true}, () => {
      this.props.walletLogin({address, password});
    });
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <Spinner visible={this.state.isLoading} />
        <View style={styles.logoViewStyle}>
          <Text style={styles.logoTextTitle}>Unity Wallet</Text>
          <Text style={styles.logoTextSubTitle}>React Native</Text>
        </View>

        <View style={styles.inputViewStyle}>
          <TextInput
            label="User ID"
            placeholder="User ID"
            style={styles.inputStyle}
            value={this.state.userId}
            duration={100}
            autoCorrect={false}
            maxLength={16}
            underlineColorAndroid="transparent"
            onChangeText={this._onUserIdChanged}
          />
        </View>

        <View style={styles.inputViewStyle}>
          <TextInput
            label="Nickname"
            placeholder="Nickname"
            style={styles.inputStyle}
            value={this.state.nickname}
            duration={100}
            autoCorrect={false}
            maxLength={16}
            underlineColorAndroid="transparent"
            onChangeText={this._onNicknameChanged}
          />
        </View>

        <View style={styles.buttonStyle}>
          <Button
            title="CONNECT"
            onPress={this._onButtonPress}
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

function mapStateToProps({loginReducer}) {
  const {error, wallet} = loginReducer;
  return {error, wallet};
}

export default connect(
  mapStateToProps,
  {initLogin, walletLogin},
)(Login);

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
