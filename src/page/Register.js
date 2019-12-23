import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReduxActions from '../actions';
import * as storage from '../storage/storage';
import {NavigationActions, StackActions} from 'react-navigation';
import {WavesAPI, NET_CONFIG} from '../utils/WavesAPI';
import RegisterScreen1 from '../components/RegisterScreen1';
import RegisterScreen2 from '../components/RegisterScreen2';

const Waves = WavesAPI.create(NET_CONFIG);

class Register extends Component {
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

    this.seed = Waves.Seed.create();
    this.onNextHandler = this.onNextHandler.bind(this);
    this.onBackHandler = this.onBackHandler.bind(this);
  }

  onNextHandler() {
    this.props.onNext(this.props.screen + 1);
  }

  onBackHandler() {
    this.props.onBack(this.props.screen > 1 ? this.props.screen - 1 : 1);
  }

  componentDidMount() {
    let me = this;
    storage.getLoginData(function(wallet) {
      if (wallet == null) {
        me.setState({isLoading: false}, () => {
          me.props.setAddress(me.seed.address);
          me.props.setPhrase(me.seed.phrase);
        });
      } else {
        me.setState({isLoading: false}, () => {
          this.redirectTo('home');
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

  render() {
    const {screen} = this.props;
    return (
      <div>
        {screen === 1 && (
          <RegisterScreen1
            onNextHandler={this.onNextHandler}
            onBackHandler={this.onBackHandler}
            seed={this.seed}
            {...this.props}
          />
        )}
        {screen === 2 && (
          <RegisterScreen2
            onNextHandler={this.onNextHandler}
            onBackHandler={this.onBackHandler}
            seed={this.seed}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    error: state.registerReducer.error,
    wallet: state.registerReducer.wallet,
    signup_data: state.registerReducer.signup_data,
    address: state.registerReducer.address,
    phrase: state.registerReducer.phrase,
    is_phrase_saved: state.registerReducer.is_phrase_saved,
    screen: state.registerReducer.screen,
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
)(Register);
