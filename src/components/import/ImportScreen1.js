import React from 'react';
import {View, Text, TextInput, ScrollView, Button} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {Spinner} from '../Spinner';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {address} from '@waves/ts-lib-crypto';

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
      error: null,
    };
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

  _onPhraseChanged = phrase => {
    this.setState({
      phrase: phrase,
      address: address(phrase),
    });
  };

  _onAddressChanged = addr => {
    this.setState({address: addr});
  };

  _onSetName = () => {
    let random = Math.floor(100 + Math.random() * 900);
    return this.state.name === ''
      ? 'Wallet ' + random.toString()
      : this.state.name;
  };

  _onButtonPress = e => {
    let ini;
    // eslint-disable-next-line consistent-this
    ini = this;
    this.props.setAddress(this.state.address);
    this.props.setPhrase(this.state.phrase);
    this.setState({isLoading: true}, () => {
      this.props.getWalletFromServ(this.state.address, function(success, data) {
        if (!success) {
          ini.setState(
            {
              isLoading: false,
            },
            () => ini.props.onGoToHandler(2),
          );
        } else {
          ini.setState(
            {
              isLoading: false,
            },
            () => {
              ini.props.setImportData(data);
              ini.props.onGoToHandler(3);
            },
          );
        }
      });
    });
  };

  render() {
    const {handleSubmit} = this.props;
    const {navigate} = this.props.navigation;

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.containerStyle}>
          <Spinner visible={this.state.isLoading} />
          <View style={styles.logoViewStyle}>
            <Text style={styles.logoTextTitle}>Import Wallet</Text>
          </View>

          <View style={styles.logoViewStyle}>
            <Text style={styles.logoTextSubTitle}>
              Import your wallet from Backup Seed Phrase or{' '}
            </Text>
            <Text
              style={styles.linkTextSubTitle}
              disabled={this.state.isLoading}
              onPress={() => this.redirectTo('login')}>
              Sign In
            </Text>
          </View>

          <View style={styles.inputViewStyle}>
            <TextInput
              label="Backup Seed Phrase"
              placeholder="Backup Seed Phrase"
              style={styles.inputStyle}
              value={this.state.phrase}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              textContentType={'name'}
              onChangeText={this._onPhraseChanged}
            />
          </View>

          <View style={styles.inputViewStyle}>
            <TextInput
              label="Wallet Address"
              placeholder="Wallet Address"
              style={styles.inputStyle}
              value={this.state.address}
              editable={false}
              autoCorrect={false}
              underlineColorAndroid="transparent"
              textContentType={'username'}
              onChangeText={this._onAddressChanged}
            />
          </View>

          <Text style={styles.errorTextStyle}>{this.props.error}</Text>

          <View style={styles.buttonStyle}>
            <Button
              title="Continue"
              onPress={handleSubmit(this._onButtonPress)}
              disabled={this.state.isLoading}
            />
          </View>

          <View style={styles.logoViewStyle}>
            <Text style={styles.logoTextSubTitle}>Or</Text>
          </View>

          <View style={styles.linkStyle}>
            <Text
              style={styles.linkTextSubTitle}
              disabled={this.state.isLoading}
              onPress={() => navigate('register')}>
              Create new wallet
            </Text>
          </View>

          <View style={[styles.footerViewStyle]}>
            <Text style={styles.footerTextStyle}>Unity Wallet v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
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
    color: '#8e8e8e',
    fontSize: 13,
    fontWeight: '500',
  },
  linkTextSubTitle: {
    color: '#7d62d9',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
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
    alignItems: 'center',
    fontSize: 13,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 30,
  },
  linkStyle: {
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 30,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#e03131',
  },
  footerViewStyle: {
    paddingLeft: 28,
    paddingRight: 28,
    marginTop: 45,
    flexDirection: 'column',
  },
  footerTextStyle: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#8e8e8e',
  },
};
