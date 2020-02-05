import React from 'react';
import {
  Dimensions,
  Platform,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {Spinner} from '../Spinner';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import {encryptPass} from '../../utils/utils';
import {encryptSeed} from '@waves/ts-lib-crypto';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';
import ButtonBack from '../ButtonBack';
import HeroDesktop from '../HeroDesktop';
import {
  isWeb,
  isLandscape,
  isPortrait,
  isScreenDesktop,
} from '../../actions/mediaQuery';

class RegisterScreen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pin: '',
      confirm_pin: '',
      use_fingerprint: false,
      fingerprint: '',
      error: '',
      errorPIN: '',
      errorConfPIN: '',
      errorFP: '',
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

  setTimer() {
    this.timer = setTimeout(this.props.onNextHandler, 1000);
  }

  gotoNext = () => {
    if (
      this.state.pin === '' ||
      this.state.errorPIN !== '' ||
      this.state.errorConfPIN !== ''
    ) {
      return false;
    }
    this.props.setSignupData({
      address: this.props.address,
      pin: encryptPass(this.state.pin),
      use_fingerprint: this.state.use_fingerprint,
      fingerprint: null,
      is_phrase_saved: false,
      phrase_encrypt: encryptSeed(this.props.phrase, this.state.pin),
      email: null,
      name: null,
      telegram_id: null,
      referrer_id: null,
    });
    this.setState({isLoading: true}, () => this.setTimer());
  };

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
          this.gotoNext();
        });
      }
    });
  };

  _onValidateConfPIN = () => {
    return this.state.pin.trim() === this.state.confirm_pin.trim();
  };

  render() {
    const {navigate} = this.props.navigation;
    const signInLink = this.props.listWallet != null &&
      this.props.listWallet.length > 0 && (
        <Text
          style={[
            s.textDefault,
            {
              marginTop: 6,
              flexDirection: 'row',
              justifyContent: 'center',
            },
          ]}>
          You can also{' '}
          <Text style={s.textLink} onPress={() => navigate('signin')}>
            Sign-in
          </Text>{' '}
          to your current wallet.
        </Text>
      );

    const logoUnity = this.state.isWeb &&
      this.state.isScreenDesktop &&
      this.state.isLandscape && (
        <TouchableOpacity
          style={s.homeBrandLogo}
          activeOpacity={vars.OPACITY_TOUCH}
          onPress={() => Linking.openURL('https://www.unity.sg/')}>
          <Image
            style={{width: 221, height: 64}}
            source={require('../../assets/img/unity-logo-title.png')}
          />
        </TouchableOpacity>
      );
    const buttonBack = this.state.isWeb &&
      (!this.state.isScreenDesktop || this.state.isPortrait) && (
        <View style={s.homeButtonBack}>
          <ButtonBack
            title="Back to Home"
            color="#2e384d"
            onPress={() => Linking.openURL('https://www.unity.sg/')}
          />
        </View>
      );
    const heroDesktop = this.state.isScreenDesktop &&
      this.state.isLandscape &&
      this.state.isWeb && <HeroDesktop />;

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
                this.state.isLandscape && {
                  width: vars.WIDTH_HOME_SIDEBAR,
                  overflowY: 'hidden',
                },
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
              <Text style={s.textTitle}>New Wallet</Text>
              <Text style={[s.textBody, {marginBottom: 30}]}>
                Fill out the details below to create your secure wallet.
              </Text>

              <View style={s.inputField}>
                <Text style={s.inputLabel}>
                  {Platform.OS === 'ios' || Platform.OS === 'android'
                    ? 'CREATE NEW PIN'
                    : 'CREATE NEW PASSWORD'}
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

              <Text
                style={[
                  s.textDefault,
                  {
                    marginTop: 6,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  },
                ]}>
                Need to{' '}
                <Text style={s.textLink} onPress={() => navigate('import')}>
                  Import A Wallet
                </Text>{' '}
                from a backup phrase?
              </Text>

              {signInLink}
            </KeyboardAvoidingView>
          </View>
          {heroDesktop}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loginData: state.loginReducer.loginData,
  };
}

RegisterScreen1.propTypes = {
  onNextHandler: PropTypes.func,
  onBackHandler: PropTypes.func,
};
RegisterScreen1.defaultProps = {};

export default reduxForm({
  form: 'register',
  destroyOnUnmount: true,
})(RegisterScreen1);
