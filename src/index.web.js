import React from 'react';
import {name as appName} from './app.json';
import {AppRegistry, View, SafeAreaView, ScrollView} from 'react-native';
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
      <ScrollView
        style={{
          maxWidth: 768,
          minWidth: 1,
          marginHorizontal: 'auto',
          width: '100%',
        }}>
        <Provider style={{fontFamily: 'sans-serif'}} store={store}>
          <PersistGate
            style={{fontFamily: 'San Francisco'}}
            loading={null}
            persistor={persistor}>
            <AppWeb style={{fontFamily: 'Roboto'}} />
          </PersistGate>
        </Provider>
      </ScrollView>
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
