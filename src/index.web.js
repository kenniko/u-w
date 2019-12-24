import React from 'react';
import {name as appName} from './app.json';
import {AppRegistry} from 'react-native';
import {createBrowserApp} from '@react-navigation/web';
import * as serviceWorker from './serviceWorker';
import AppStack from './nav/AppStack';
import AppOptions from './nav/AppOptions';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';

const AppWeb = createBrowserApp(AppStack, AppOptions);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWeb />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
