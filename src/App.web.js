import React from 'react';
import {ScrollView} from 'react-native';
import {createBrowserApp} from '@react-navigation/web';
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
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          maxWidth: 769,
          minWidth: 1,
          marginHorizontal: 'auto',
          width: '100%',
        }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppWeb />
          </PersistGate>
        </Provider>
      </ScrollView>
    );
  }
}

export default App;
