import React from 'react';
import {Platform, SafeAreaView, View} from 'react-native';
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
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNav />
        </PersistGate>
      </Provider>
    );
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
})(App);
