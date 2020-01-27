import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReduxActions from '../actions';
import {Spinner} from '../components/Spinner';
import s from '../assets/styles/Styles';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import {NavigationActions, StackActions} from 'react-navigation';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.loginData != null) {
      this.redirectTo('home');
    } else if (
      this.props.listWallet != null &&
      this.props.listWallet.length > 0
    ) {
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

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flexGrow: 1}}>
        <View style={[s.container, s.conCenter]}>
          <Spinner visible={this.state.isLoading} />
          <Text style={s.textTitle}>Welcome to Unity Wallet</Text>
          <Text style={[s.textBody, {marginBottom: 60}]}>
            If you've already created an account before you can import it below
            or create a new wallet in a few seconds for free. Please remember to
            save your Backup Seed Phrase for backup and never share with anyone
            as that would provide them access to your money.
          </Text>

          <ButtonPrimary
            title="Create New Wallet"
            onPress={() => navigate('register')}
            disabled={this.state.isLoading}
          />

          <Text style={s.textSeparator}>or</Text>

          <ButtonSecondary
            title="Import Wallet"
            onPress={() => navigate('import')}
            disabled={this.state.isLoading}
          />

          <Text style={s.textError}>{this.props.error}</Text>

          {/* <View style={[styles.footerViewStyle]}>
            <Text style={styles.footerTextStyle}>Unity Wallet v1.0.0</Text>
          </View> */}
        </View>
      </ScrollView>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state) {
  return {
    error: state.loginReducer.error,
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
)(Welcome);
