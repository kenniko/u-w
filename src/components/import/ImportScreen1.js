import {address, encryptSeed} from '@waves/ts-lib-crypto';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {reduxForm} from 'redux-form';
import {
  isLandscape,
  isPortrait,
  isScreenDesktop,
  isWeb,
} from '../../actions/mediaQuery';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';
import ButtonBack from '../../components/ButtonBack';
import HeroDesktop from '../../components/HeroDesktop';
import {encryptPass} from '../../utils/utils';
import {Spinner} from '../Spinner';

class ImportScreen1 extends React.Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      phrase: '',
      address: '',
      error: '',
      errorPhrase: '',
      errorAddress: '',
      pin: '',
      confirm_pin: '',
      use_fingerprint: false,
      fingerprint: '',
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

  _onValidatePhrase = () => {
    return this.state.phrase.trim().length > 0;
  };

  _onPhraseChanged = phrase => {
    this.setState(
      {
        phrase: phrase.trim(),
        address: address(phrase.trim()),
      },
      () => {
        if (!this._onValidatePhrase()) {
          this.setState({
            errorPhrase: 'Required',
          });
        } else {
          this.setState({errorPhrase: ''});
        }
      },
    );
  };

  _onValidateAddress = () => {
    return this.state.address.trim().length > 0;
  };

  _onAddressChanged = addr => {
    this.setState({address: addr}, () => {
      if (!this._onValidateAddress()) {
        this.setState({
          errorAddress: 'Required',
        });
      } else {
        this.setState({errorAddress: ''});
      }
    });
  };

  setTimer() {
    this.timer = setTimeout(this.props.onNextHandler, 500);
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

  _onButtonPress = () => {
    if (
      this.state.address === '' ||
      this.state.phrase === '' ||
      this.state.errorAddress !== '' ||
      this.state.errorPhrase !== ''
    ) {
      return false;
    }
    if (
      this.state.pin === '' ||
      this.state.errorPIN !== '' ||
      this.state.errorConfPIN !== ''
    ) {
      return false;
    }

    let ini;
    // eslint-disable-next-line consistent-this
    ini = this;
    this.props.setAddress(this.state.address);
    this.props.setPhrase(this.state.phrase);
    this.setState({isLoading: true}, () => {
      this.props.getWalletFromServ(this.state.address, function(success, data) {
        if (!success) {
          ini.props.setImportData({
            address: ini.props.address,
            pin: encryptPass(ini.state.pin),
            use_fingerprint: ini.state.use_fingerprint,
            fingerprint: null,
            is_phrase_saved: true,
            phrase_encrypt: encryptSeed(ini.state.phrase, ini.state.pin),
            email: null,
            name: null,
            telegram_id: null,
            referrer_id: null,
          });
          ini.props.onGoToHandler(2);
        } else {
          data.pin = encryptPass(ini.state.pin);
          data.use_fingerprint = ini.state.use_fingerprint;
          data.fingerprint = null;
          data.is_phrase_saved = true;
          data.phrase_encrypt = encryptSeed(ini.state.phrase, ini.state.pin);
          ini.props.setAddress(null);
          ini.props.setPhrase(null);
          ini.props.setImportData(null);
          ini.props.setPhraseSaved(false);
          ini.props.setLoginData(data);
          ini.props.setWalletList(ini.props.listWallet, data);
          ini.redirectTo('dashboard');
        }
      });
    });
  };

  render() {
    const {navigate} = this.props.navigation;

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
              <Text style={s.textTitle}>Import Wallet</Text>
              <Text style={[s.textBody, {marginBottom: 30}]}>
                Import your wallet from Backup Seed Phrase or{' '}
                <Text style={[s.textLink]} onPress={() => navigate('signin')}>
                  Go Back
                </Text>
              </Text>

              <View style={s.inputField}>
                <Text style={s.inputLabel}>BACKUP SEED PHRASE</Text>
                <TextInput
                  label="BACKUP SEED PHRASE"
                  placeholder="Enter your Backup Seed Phrase"
                  placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                  style={[
                    s.inputPrimary,
                    this.state.errorPhrase ? s.inputError : '',
                  ]}
                  value={this.state.phrase}
                  autoCorrect={false}
                  autoFocus={true}
                  underlineColorAndroid="transparent"
                  textContentType={'name'}
                  onChangeText={this._onPhraseChanged}
                />
                <Text
                  style={[
                    s.textErrorInput,
                    !this.state.errorPhrase && s.isHide,
                  ]}>
                  {this.state.errorPhrase}
                </Text>
              </View>

              <View style={s.inputField}>
                <Text style={s.inputLabel}>WALLET ADDRESS</Text>
                <TextInput
                  label="WALLET ADDRESS"
                  placeholder="Enter your Wallet Address"
                  placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                  style={[
                    s.inputPrimary,
                    this.state.errorAddress ? s.inputError : '',
                  ]}
                  value={this.state.address}
                  autoCorrect={false}
                  autoFocus={false}
                  editable={false}
                  underlineColorAndroid="transparent"
                  textContentType={'username'}
                  onChangeText={this._onAddressChanged}
                />
                <Text
                  style={[
                    s.textErrorInput,
                    !this.state.errorAddress && s.isHide,
                  ]}>
                  {this.state.errorAddress}
                </Text>
              </View>

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
                Don't have an account?{' '}
                <Text style={s.textLink} onPress={() => navigate('create')}>
                  Create a new wallet
                </Text>
              </Text>
            </KeyboardAvoidingView>
          </View>
          {heroDesktop}
        </ScrollView>
      </View>
    );
  }
}

ImportScreen1.propTypes = {
  onGoToHandler: PropTypes.func,
};
ImportScreen1.defaultProps = {};

export default reduxForm({
  form: 'import',
  destroyOnUnmount: true,
})(ImportScreen1);
