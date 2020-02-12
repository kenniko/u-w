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
import {NavigationActions, StackActions} from 'react-navigation';
import {Spinner} from '../Spinner';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import s from '../../assets/styles/Styles';
import {vars} from '../../assets/styles/Vars';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonBack from '../../components/ButtonBack';
import HeroDesktop from '../../components/HeroDesktop';
import {
  isWeb,
  isLandscape,
  isPortrait,
  isScreenDesktop,
} from '../../actions/mediaQuery';

class ImportScreen2 extends React.Component {
  static navigationOptions = {
    headershown: false,
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: '',
      email: '',
      telegram_id: '',
      error: '',
      errorEmail: '',
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

  _onNameChanged = name => {
    this.setState({name: name.trim()});
  };

  _onEmailChanged = email => {
    this.setState({email: email.trim()}, () => {
      if (!this._onValidateEmail()) {
        this.setState({
          errorEmail: 'Email address format is invalid.',
        });
      } else {
        this.setState({errorEmail: ''});
      }
    });
  };

  _onValidateEmail = () => {
    let regxp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.email.trim().length > 0) {
      if (!regxp.test(this.state.email.trim())) {
        return false;
      }
    }
    return true;
  };

  _onTelegramIDChanged = telegram_id => {
    this.setState({telegram_id: telegram_id.trim()});
  };

  _onSetName = () => {
    let random = Math.floor(100 + Math.random() * 900);
    return this.state.name === ''
      ? 'Wallet ' + random.toString()
      : this.state.name;
  };

  _onButtonPress = e => {
    if (!this._onValidateEmail()) {
      return false;
    }
    let ini;
    // eslint-disable-next-line consistent-this
    ini = this;
    this.setState({isLoading: true}, () => {
      this.props.saveRegister(
        {
          address: this.props.address,
          email: this.state.email,
          name: this._onSetName(),
          telegram_id: this.state.telegram_id,
          referrer_id: null,
        },
        function(success, data) {
          if (!success) {
            ini.setState({
              isLoading: false,
              error: data,
            });
          } else {
            data.pin = ini.props.import_data.pin;
            data.use_fingerprint = ini.props.import_data.use_fingerprint;
            data.fingerprint = ini.props.import_data.fingerprint;
            data.is_phrase_saved = ini.props.import_data.is_phrase_saved;
            data.phrase_encrypt = ini.props.import_data.phrase_encrypt;
            ini.props.setAddress(null);
            ini.props.setPhrase(null);
            ini.props.setImportData(null);
            ini.props.setPhraseSaved(false);
            ini.props.setLoginData(data);
            ini.props.setWalletList(ini.props.listWallet, data);
            ini.redirectTo('dashboard');
          }
        },
      );
    });
  };

  render() {
    const {handleSubmit} = this.props;

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

              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  marginTop: 6,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <ButtonBack
                  title="Re-import"
                  color={vars.COLOR_PRIMARY}
                  onPress={() => this.props.onGoToHandler()}
                />
              </View>

              <View style={[s.inputField, {marginTop: 20}]}>
                <Text style={s.inputLabel}>FULL NAME (Optional)</Text>
                <TextInput
                  label="Name"
                  placeholder="What's your full name?"
                  placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                  style={[s.inputPrimary]}
                  value={this.state.name}
                  autoCorrect={false}
                  autoFocus={true}
                  underlineColorAndroid="transparent"
                  textContentType={'name'}
                  onChangeText={this._onNameChanged}
                />
              </View>

              <View style={s.inputField}>
                <Text style={s.inputLabel}>EMAIL ADDRESS (Optional)</Text>
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                  style={[
                    s.inputPrimary,
                    this.state.errorEmail ? s.inputError : '',
                  ]}
                  value={this.state.email}
                  autoCorrect={false}
                  textContentType={'emailAddress'}
                  underlineColorAndroid="transparent"
                  onChangeText={this._onEmailChanged}
                />
                <Text
                  style={[
                    s.textErrorInput,
                    !this.state.errorEmail ? s.isHide : null,
                  ]}>
                  {this.state.errorEmail}
                </Text>
              </View>

              <View style={s.inputField}>
                <Text style={s.inputLabel}>TELEGRAM ID (Optional)</Text>
                <TextInput
                  label="Telegram ID"
                  placeholder="Your telegram ID"
                  placeholderTextColor={vars.COLOR_TEXT_PLACEHOLDER}
                  style={[
                    s.inputPrimary,
                    this.state.errorPass ? s.inputError : '',
                  ]}
                  value={this.state.telegram_id}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onChangeText={this._onTelegramIDChanged}
                />
                <Text style={s.textHelp}>
                  This will allow automatic VIP membership for token holders
                </Text>
              </View>

              <Text style={s.textError}>{this.props.error}</Text>

              <ButtonPrimary
                title="Continue"
                onPress={handleSubmit(this._onButtonPress)}
                disabled={this.state.isLoading}
              />
            </KeyboardAvoidingView>
          </View>
          {heroDesktop}
        </ScrollView>
      </View>
    );
  }
}

ImportScreen2.propTypes = {
  onGoToHandler: PropTypes.func,
};
ImportScreen2.defaultProps = {};

export default reduxForm({
  form: 'import',
  destroyOnUnmount: true,
})(ImportScreen2);
