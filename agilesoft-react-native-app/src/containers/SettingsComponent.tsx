import React, {FC, memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/colors';

const SettingsComponent:FC<{}> = () => {
  const {t, i18n} = useTranslation();
  return (
   <>
      <Text>{t('settings')}</Text>
      <Button title={t('english')} onPress={() => i18n.changeLanguage('en')} />
      <Button title={t('spanish')} onPress={() => i18n.changeLanguage('fr')} />
  </>
  );
}

export default memo(SettingsComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.aliceBlue,
  },
});
