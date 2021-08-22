import AsyncStorage from '@react-native-async-storage/async-storage';
import themeReducer, {ThemeState} from '../reducers/themeReducer';
import sagas from '../sagas';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Dispatch,
  MiddlewareAPI,
} from 'redux';

import ReduxThunk from 'redux-thunk';

import {PersistConfig, persistReducer, persistStore} from 'redux-persist';

import createSagaMiddleware from 'redux-saga';
import {RootAction} from '../actions/actionTypes';

import baseReducer from '../utils/reducer'
import {IState} from '../utils/interfaces'

const appPersistConfig: PersistConfig<
  IState,
  unknown,
  unknown,
  unknown
> = {
  storage: AsyncStorage,
  key: 'app',
};


const themePersistConfig: PersistConfig<ThemeState, unknown, unknown, unknown> =
  {
    storage: AsyncStorage,
    key: 'theme',
  };

export const reducers = {
  app: persistReducer(appPersistConfig, baseReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
};

export const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;


const systemMiddleware =
  (_store: MiddlewareAPI) => (next: Dispatch) => (action: RootAction) => {
    //   var state = store.getState()
    //   switch (action.type) {
    //     case actions.ACCION:
    //       *un middlewhare sencillo, a nivel de sistema para procesar acciones tipo string no definidas.
    //       break;
    //   }
    next(action);

  };

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, systemMiddleware,ReduxThunk];
const enhancers = [applyMiddleware(...middlewares)];
export const store = createStore(rootReducer, compose(...enhancers));

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);

//persistor.purge() para resetear
