import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(thunk)),
);

const persistor = persistStore(store);

// Exports
export {store, persistor};
