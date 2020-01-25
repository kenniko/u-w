import React from 'react';
import {Platform} from 'react-native';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import AppStack from './nav/AppStack';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import isElectron from 'is-electron';
import packageJson from '../package.json';

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

const AppNav = createAppContainer(AppStack);

//const App: () => React$Node = () => {
class App extends React.Component {
  // componentDidMount() {
  //   codePush.sync({
  //     updateDialog: true,
  //     installMode: codePush.InstallMode.IMMEDIATE,
  //     checkFrequency: codePush.CheckFrequency.ON_APP_START,
  //     installMode: codePush.InstallMode.IMMEDIATE
  //   });
  // }

  render() {
    return (
      <Provider style={{fontFamily: 'sans-serif'}} store={store}>
        <PersistGate
          style={{fontFamily: 'San Francisco'}}
          loading={null}
          persistor={persistor}>
          <AppNav style={{fontFamily: 'Roboto'}} />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
