import React from 'react';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import AppStack from './nav/AppStack';
import store from './store';

const App: () => React$Node = () => {
  const AppNav = createAppContainer(AppStack);
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};

export default App;
