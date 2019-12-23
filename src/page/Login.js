import React, {Component} from 'react';
import {View, Text, TextInput, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReduxActions from '../actions';
import {Spinner} from '../components/Spinner';
import * as storage from '../storage/storage';
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
    let me = this;
    storage.getLoginData(function(wallet) {
      if (wallet == null) {
        storage.checkWalletList(function(exist) {
          if (exist) {
            me.setState({isLoading: false}, () => {
              me.props.initLogin();
            });
          } else {
            me.setState({isLoading: false}, () => {
              me.redirectTo('welcome');
            });
          }
        });
      } else {
        me.setState({isLoading: false}, () => {
          me.redirectTo('home');
        });
      }
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.wallet !== this.props.wallet &&
      this.props.wallet.length > 0
    ) {
      this.setState({isLoading: false}, () => {
        let wallet = this.props.wallet;
        wallet.password = this.props.signup_data.password;
        wallet.is_phrase_saved = this.props.is_phrase_saved;
        this.props.setLoginData(wallet);
        this.redirectTo('home');
      });
    }
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
            label="Address"
            placeholder="Address"
            style={styles.inputStyle}
            value={this.state.address}
            duration={100}
            autoCorrect={false}
            maxLength={100}
            underlineColorAndroid="transparent"
            onChangeText={this._onaddressChanged}
          />
        </View>

        <View style={styles.inputViewStyle}>
          <TextInput
            label="Password"
            placeholder="Password"
            style={styles.inputStyle}
            value={this.state.password}
            duration={100}
            autoCorrect={false}
            maxLength={100}
            underlineColorAndroid="transparent"
            onChangeText={this._onpasswordChanged}
          />
        </View>

        <View style={styles.buttonStyle}>
          <Button
            title="Sign In"
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

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    error: state.loginReducer.error,
    wallet: state.loginReducer.wallet,
  };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ReduxActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
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
