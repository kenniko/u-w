import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReduxActions from '../actions';
import {NavigationActions, StackActions} from 'react-navigation';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.setWalletList(this.props.listWallet, this.props.loginData);
    if (this.props.loginData == null) {
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

  _onButtonLogoutPress = () => {
    this.props.setNullSignupLoginFail();
    this.props.setLoginData(null);
    this.redirectTo('login');
  };

  render() {
    console.log(this.props);

    return (
      <View style={styles.containerStyle}>
        <View style={styles.logoViewStyle}>
          <Text style={styles.logoTextTitle}>Welcome to Unity Wallet</Text>
          <Text style={styles.logoTextTitle}>
            {this.props.loginData !== null
              ? this.props.loginData.name +
                ' your address : ' +
                this.props.loginData.address
              : ''}
          </Text>
        </View>

        <View style={styles.buttonStyle}>
          <Button
            title="Log out"
            onPress={this._onButtonLogoutPress}
            disabled={this.state.isLoading}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    error: state.loginReducer.error,
    wallet: state.loginReducer.wallet,
    listWallet: state.loginReducer.listWallet,
    loginData: state.loginReducer.loginData,
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
)(Home);

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
