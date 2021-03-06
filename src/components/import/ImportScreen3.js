import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
  Platform,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Spinner} from '../Spinner';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {encryptPass} from '../../utils/utils';
import {NavigationActions, StackActions} from 'react-navigation';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';
import ButtonBack from '../../components/ButtonBack';
import HeroDesktop from '../../components/HeroDesktop';
import {
  isWeb,
  isLandscape,
  isPortrait,
  isScreenDesktop,
} from '../../actions/mediaQuery';

class ImportScreen3 extends React.Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pin: '',
      confirm_pin: '',
      error: '',
      errorPIN: '',
      errorConfPIN: '',
      label:
        Platform.OS === 'ios' || Platform.OS === 'android' ? 'PIN' : 'Password',
      isWeb: isWeb(),
      isLandscape: isLandscape(),
      isPortrait: isPortrait(),
      isScreenDesktop: isScreenDesktop(),
    };

    Dimensions.addEventListener('change', () => {
      this.setState({
        isLandscape: isLandscape(),
        isPortrait: isPortrait(),
        isScreenDesktop: isScreenDesktop(),
      });
    });
  }

  _onValidatePIN = () => {
    return this.state.pin.trim().length > 7;
  };

  _onPINChanged = pin => {
    this.setState({pin: pin.trim()}, () => {
      if (!this._onValidatePIN()) {
        this.setState({
          errorPIN: this.state.label + ' must be at least 8 characters.',
        });
      } else {
        this.setState({errorPIN: ''});
      }
    });
  };

  _onConfirmPINChanged = confirm_pin => {
    this.setState({confirm_pin: confirm_pin.trim()}, () => {
      if (!this._onValidateConfPIN()) {
        this.setState({
          errorConfPIN:
            'Confirm ' +
            this.state.label +
            ' does not match the ' +
            this.state.label,
        });
      } else {
        this.setState({errorConfPIN: ''}, () => {
          this._onButtonPress();
        });
      }
    });
  };

  _onValidateConfPIN = () => {
    return this.state.pin.trim() === this.state.confirm_pin.trim();
  };

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

  setTimer() {
    this.timer = setTimeout(this.redirectTo('dashboard'), 1000);
  }

  _onButtonPress = () => {
    if (
      this.state.pin === '' ||
      this.state.errorPIN !== '' ||
      this.state.errorConfPIN !== ''
    ) {
      return false;
    }
    this.setState({isLoading: true}, () => {
      let data = this.props.import_data;
      data.pin = encryptPass(this.state.pin);
      this.props.setAddress(null);
      this.props.setPhrase(null);
      this.props.setImportData(null);
      this.props.setPhraseSaved(false);
      this.props.setLoginData(data);
      this.props.setWalletList(this.props.listWallet, data);
      this.setState({isLoading: true}, () => this.setTimer());
    });
  };

  render() {
    const logoUnity =
      this.state.isWeb &&
      this.state.isScreenDesktop &&
      this.state.isLandscape ? (
        <TouchableOpacity
          style={s.homeBrandLogo}
          activeOpacity={vars.OPACITY_TOUCH}
          onPress={() => Linking.openURL('https://www.unity.sg/')}>
          <Image
            style={{width: 221, height: 64}}
            source={require('../../assets/img/unity-logo-title.png')}
          />
        </TouchableOpacity>
      ) : null;
    const buttonBack =
      this.state.isWeb &&
      (!this.state.isScreenDesktop || this.state.isPortrait) ? (
        <View style={s.homeButtonBack}>
          <ButtonBack
            title="Back to Home"
            color="#2e384d"
            onPress={() => Linking.openURL('https://www.unity.sg/')}
          />
        </View>
      ) : null;
    const heroDesktop =
      this.state.isScreenDesktop &&
      this.state.isLandscape &&
      this.state.isWeb ? (
        <HeroDesktop />
      ) : null;

    return (
      <View>
        {buttonBack}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          {logoUnity}
          <View
            style={[
              s.container,
              s.conCenter,
              this.state.isWeb &&
              this.state.isScreenDesktop &&
              this.state.isLandscape
                ? {
                    width: vars.WIDTH_HOME_SIDEBAR,
                    overflowY: 'hidden',
                  }
                : null,
              {
                marginTop: this.state.isScreenDesktop ? 100 : 50,
                paddingBottom: this.state.isScreenDesktop ? 100 : 10,
              },
            ]}>
            <Spinner visible={this.state.isLoading} />
            <KeyboardAvoidingView
              style={s.homeWrpContent}
              behavior="padding"
              enabled={Platform.OS === 'ios'}>
              <Text style={s.textTitle}>Import Wallet</Text>
              <Text style={[s.textBody, {marginBottom: 30}]}>
                Fill out the details below to create your secure wallet.
              </Text>

              <View style={s.inputField}>
                <Text style={s.inputLabel}>
                  {Platform.OS === 'ios' || Platform.OS === 'android'
                    ? 'PLEASE ENTER A PIN'
                    : 'PLEASE ENTER A PASSWORD'}
                </Text>
                <TextInput
                  label={
                    Platform.OS === 'ios' || Platform.OS === 'android'
                      ? 'PIN'
                      : 'PASSWORD'
                  }
                  placeholder="Enter 8 characters or more"
                  placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                  style={[
                    s.inputPrimary,
                    this.state.errorPIN ? s.inputError : '',
                  ]}
                  value={this.state.pin}
                  autoCorrect={false}
                  autoFocus={true}
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  keyboardType={'number-pad'}
                  textContentType={'password'}
                  onChangeText={this._onPINChanged}
                />
                <Text
                  style={[
                    s.textErrorInput,
                    this.state.errorPIN ? s.isShow : s.isHide,
                  ]}>
                  {this.state.errorPIN}
                </Text>
              </View>

              <View style={s.inputField}>
                <Text style={s.inputLabel}>
                  {Platform.OS === 'ios' || Platform.OS === 'android'
                    ? 'CONFIRM PIN'
                    : 'CONFIRM PASSWORD'}
                </Text>
                <TextInput
                  label={
                    Platform.OS === 'ios' || Platform.OS === 'android'
                      ? 'CONFIRM PIN'
                      : 'CONFIRM PASSWORD'
                  }
                  placeholder={
                    Platform.OS === 'ios' || Platform.OS === 'android'
                      ? 'Re-enter your PIN'
                      : 'Re-enter your password'
                  }
                  placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                  style={[
                    s.inputPrimary,
                    this.state.errorConfPIN ? s.inputError : '',
                  ]}
                  value={this.state.confirm_pin}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  keyboardType={'number-pad'}
                  textContentType={'password'}
                  onChangeText={this._onConfirmPINChanged}
                />
                <Text
                  style={[
                    s.textErrorInput,
                    this.state.errorConfPIN ? s.isShow : s.isHide,
                  ]}>
                  {this.state.errorConfPIN}
                </Text>
              </View>

              <Text style={s.textError}>{this.props.error}</Text>
            </KeyboardAvoidingView>
          </View>
          {heroDesktop}
        </ScrollView>
      </View>
    );
  }
}

ImportScreen3.propTypes = {
  onGoToHandler: PropTypes.func,
};
ImportScreen3.defaultProps = {};

export default reduxForm({
  form: 'import',
  destroyOnUnmount: true,
})(ImportScreen3);
