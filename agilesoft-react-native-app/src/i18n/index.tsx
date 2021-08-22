import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import { Config } from '../config';

const resources = {
  en: {
    translation: {
      english: 'English',
      spanish: 'Español',
      welcome: `${Config.APP_NAME}`,
      settings: 'Settings',
      detail: 'Detail',
      home: 'Home',
      welcomeuser: 'Welcome ',
      required: 'Required'

    },
  },
  fr: {
    translation: {
      welcome: `${Config.APP_NAME}`,
      settings: 'Configuración',
      detail: 'Detalle',
      home: 'Inicio',
      welcomeuser: 'Bienvenido ',
      required: 'Campo requerido'
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
