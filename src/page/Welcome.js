import React, {Component} from 'react';
import {
  Platform,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ReduxActions from '../actions';
import s from '../assets/styles/Styles';
import {vars} from '../assets/styles/Vars';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonBack from '../components/ButtonBack';
import HeroDesktop from '../components/HeroDesktop';
import {Spinner} from '../components/Spinner';
import {
  isWeb,
  isLandscape,
  isPortrait,
  isWidthMin,
  isHeightMin,
} from '../actions/mediaQuery';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isWeb: isWeb(),
      isLandscape: isLandscape(),
      isPortrait: isPortrait(),
      isDesktopScreen: isWidthMin(899) && isHeightMin(449),
    };

    // Event Listener for isDesktopScreen changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        isLandscape: isLandscape(),
        isPortrait: isPortrait(),
        isDesktopScreen: isWidthMin(899) && isHeightMin(449),
      });
    });
  }

  componentDidMount() {
    if (this.props.loginData != null) {
      this.redirectTo('dashboard');
    } else if (
      this.props.listWallet != null &&
      this.props.listWallet.length > 0
    ) {
      this.redirectTo('signin');
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

    const logoUnity = this.state.isWeb &&
      this.state.isDesktopScreen &&
      this.state.isLandscape && (
        <TouchableOpacity
          style={styles.brandLogo}
          activeOpacity={vars.OPACITY_TOUCH}
          onPress={() => Linking.openURL('https://www.unity.sg/')}>
          <Image
            style={{width: 221, height: 64}}
            source={require('../assets/img/unity-logo-title.png')}
          />
        </TouchableOpacity>
      );
    const buttonBack = this.state.isWeb &&
      (!this.state.isDesktopScreen || this.state.isPortrait) && (
        <View style={styles.buttonBack}>
          <ButtonBack
            title="Back to Home"
            color="#2e384d"
            onPress={() => Linking.openURL('https://www.unity.sg/')}
          />
        </View>
      );
    const heroDesktop = this.state.isDesktopScreen &&
      this.state.isLandscape &&
      this.state.isWeb && <HeroDesktop />;

    return (
      <View>
        {buttonBack}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{flexGrow: 1}}>
          <Spinner visible={this.state.isLoading} />
          {logoUnity}
          <View
            style={[
              s.container,
              s.conCenter,
              this.state.isWeb &&
                this.state.isDesktopScreen &&
                this.state.isLandscape && {
                  width: vars.WIDTH_HOME_SIDEBAR,
                  overflowY: 'hidden',
                },
              {
                marginTop: this.state.isDesktopScreen ? 100 : 50,
                paddingBottom: this.state.isDesktopScreen ? 100 : 10,
              },
            ]}>
            <View style={styles.wrpContent}>
              <Text style={s.textTitle}>Welcome to Unity Wallet</Text>
              <Text
                style={[
                  s.textBody,
                  {marginBottom: this.state.isDesktopScreen ? 80 : 40},
                ]}>
                If you've already created an account before you can import it
                below or create a new wallet in a few seconds for free. Please
                remember to save your Backup Seed Phrase for backup and never
                share with anyone as that would provide them access to your
                money.
              </Text>

              <View style={styles.wrpAction}>
                <ButtonPrimary
                  title="Create New Wallet"
                  onPress={() => navigate('create')}
                  disabled={this.state.isLoading}
                />

                <Text style={s.textSeparator}>or</Text>

                <ButtonSecondary
                  title="Import Wallet"
                  onPress={() => navigate('import')}
                  disabled={this.state.isLoading}
                />
              </View>

              <Text style={s.textError}>{this.props.error}</Text>
            </View>

            {/* <View style={[styles.footerViewStyle]}>
              <Text style={styles.footerTextStyle}>Unity Wallet v1.0.0</Text>
            </View> */}
          </View>
          {heroDesktop}
        </ScrollView>
      </View>
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

const styles = StyleSheet.create({
  wrpContent: {
    width: '100%',
    maxWidth: 435,
    alignSelf: 'center',
  },
  wrpAction: {
    width: '100%',
    maxWidth: 350,
    // alignSelf: 'center',
  },
  buttonBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    paddingLeft: vars.GAP_H_CONTAINER,
    zIndex: 9,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  brandLogo: {
    position: 'absolute',
    zIndex: 9,
    top: 30,
    left: '5%',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
