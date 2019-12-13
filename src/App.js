/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import isElectron from 'is-electron';
import packageJson from '../package.json';

import {AppHeader} from './AppHeader';
import {AppInstruction} from './AppInstruction';

import codePush from 'react-native-code-push';

let currentPlatform = Platform.OS;
let appVersion = packageJson.version;
if (isElectron()) {
  currentPlatform = 'desktop';
  window.ipcRenderer.send('app_version');
  window.ipcRenderer.on('app_version', (event, arg) => {
    window.ipcRenderer.removeAllListeners('app_version');
    appVersion = arg.version;
  });
}

// const App: () => React$Node = () => {
class App extends Component {

  componentDidMount() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <AppHeader />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  Test Code Push
                </Text>
                <Text style={styles.sectionDescription}>
                  It works!
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  Unity Wallet {appVersion} on{' '}
                  <Text style={styles.textCapitalize}>{currentPlatform}</Text>
                </Text>
                <Text style={styles.sectionDescription}>
                  Hello <Text style={styles.highlight}>Words</Text>
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Version</Text>
                <Text style={styles.sectionDescription}>{appVersion}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Platform</Text>
                <Text style={styles.sectionDescription}>{currentPlatform}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>
              <AppInstruction />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'gray',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE
}

export default App = codePush(codePushOptions)(App)
