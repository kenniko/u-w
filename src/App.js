import React from 'react';
import {Platform, SafeAreaView, View, Alert} from 'react-native';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import AppStack from './nav/AppStack';
import AppOptions from './nav/AppOptions';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import isElectron from 'is-electron';
import packageJson from '../package.json';
import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';
import FlashMessage, {showMessage} from 'react-native-flash-message';

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

const AppNav = createAppContainer(AppStack, AppOptions);

//const App: () => React$Node = () => {
class App extends React.Component {
  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        showMessage({
          message: "Update Installed",
          description: "Click here to finish updating.",
          type: "info",
          icon: "warning",
          position: "bottom",
          autoHide: false,
          onPress: () => {
            Alert.alert('Nearly up to date!', 'Relaunch app to finish updating.', [
              {text: 'Relaunch', onPress: () => codePush.restartApp()},
              {text: 'Later', style: 'cancel'},
            ], { cancelable: false });
          }
        });
        break;
    }
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <AppNav />
            <FlashMessage ref="myLocalFlashMessage" />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: false,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
})(App);
