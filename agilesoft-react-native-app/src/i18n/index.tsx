import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import { Config } from '../config';
/*
original_title`)}
original_language
release_date`)}</
*/
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
      required: 'Required',
      original_title: 'Original title',
      original_language: 'Original Language',
      release_date: "Release Date",
      appearance: "Appearance",
      language: "Language",
      cache: "Clean Cache"

    },
  },
  fr: {
    translation: {
      welcome: `${Config.APP_NAME}`,
      settings: 'Configuración',
      detail: 'Detalle',
      home: 'Inicio',
      welcomeuser: 'Bienvenido ',
      required: 'Campo requerido',
      original_title: ' Titulo Original',
      original_language: 'Idioma original',
      release_date: "Fecha de estreno",
      appearance: "Apariencia",
      language: "Idioma",
      cache: "limpiar Cache"
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
