import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import App from './App';
import {persistor, store} from './store';
import NavigationService, {navigationRef} from './lib/NavigationService';
import './i18n';
import {enableScreens} from 'react-native-screens';
//import { useTheme } from './Theme';


//enableScreens(); //https://reactnavigation.org/docs/react-native-screens/

export default function Root() {

  return (
    <Provider store={store}>
      {/**
       * PersistGate retrasa el rendereo de la interfaz hasta que el estado persistido sea recibido y guardado en redux.
       * `loading` puede ser `null`  o una instancia a mostrar durante el loading, e.g: un splash screen
       *  `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={<View />} persistor={persistor}>
          <App />
      </PersistGate>
    </Provider>
  );
}
