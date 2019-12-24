import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReduxActions from '../actions';
import {Spinner} from '../components/Spinner';
import {NavigationActions, StackActions} from 'react-navigation';

class Launch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.loginData == null) {
      this.redirectTo('login');
    } else {
      this.redirectTo('home');
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
    return (
      <View style={styles.containerStyle}>
        <Spinner visible={this.state.isLoading} />
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
)(Launch);

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
  },
};
