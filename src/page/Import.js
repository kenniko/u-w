import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReduxActions from '../actions';
import {View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import ImportScreen1 from '../components/import/ImportScreen1';
import ImportScreen2 from '../components/import/ImportScreen2';
import ImportScreen3 from '../components/import/ImportScreen3';
import ImportScreen4 from '../components/import/ImportScreen4';

class Import extends Component {
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
    };

    this.onGoToHandler = this.onGoToHandler.bind(this);
  }

  onGoToHandler(go) {
    this.props.onGoto(go);
  }

  componentDidMount() {
    if (this.props.loginData != null) {
      this.redirectTo('home');
    } else {
      this.props.initImport();
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
    const {import_screen} = this.props;
    console.log(import_screen);
    return (
      <View>
        {import_screen === 1 && (
          <ImportScreen1 onGoToHandler={this.onGoToHandler} {...this.props} />
        )}
        {import_screen === 2 && (
          <ImportScreen2 onGoToHandler={this.onGoToHandler} {...this.props} />
        )}
        {import_screen === 3 && (
          <ImportScreen3 onGoToHandler={this.onGoToHandler} {...this.props} />
        )}
        {import_screen === 4 && (
          <ImportScreen4 onGoToHandler={this.onGoToHandler} {...this.props} />
        )}
      </View>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    import_data: state.importReducer.import_data,
    address: state.registerReducer.address,
    phrase: state.registerReducer.phrase,
    is_phrase_saved: state.registerReducer.is_phrase_saved,
    import_screen: state.importReducer.import_screen,
    error: state.registerReducer.error,
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
)(Import);
