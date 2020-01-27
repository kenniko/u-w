import React from 'react';
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWeb />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
