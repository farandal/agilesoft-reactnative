import React, {FC, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import { Button, StyleSheet, Switch, Text, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeState } from 'src/reducers/themeReducer';
import ACTIONS from '../utils/actions';
import { actionDispatch } from '../utils/standardActions';
//import Colors from '../constants/colors';
import changeThemeAction from '../actions/themeActions';

import {useTheme} from '../Theme';

const SettingsComponent:FC<{}> = () => {

  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const {Layout, Images,Fonts,Common,Colors} = useTheme();

  const [isDMEnabled, setIsDMEnabled] = useState(false);
  const toggleDarkMode= () => setIsDMEnabled(dm => !dm);

  const [currentTheme, setCurrentTheme] = useState<string>("default");

  const changeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    console.log(theme,darkMode);
    dispatch(changeThemeAction({ theme, darkMode }))
  }

  const cleanCache = () => {
    dispatch(actionDispatch(ACTIONS.CLEAN_CACHE,{}))
  }

  useEffect(() => {
    changeTheme({theme:currentTheme, darkMode:isDMEnabled});

  }, [isDMEnabled,currentTheme])

  return (
   <>
<View style={[Layout.fullWidth, Layout.center]} >

    <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.textRegular,{color:Colors.white,backgroundColor:Colors.greyTransparent}]}>{t('appearance')}</Text>

    <View style={[Layout.flex,{marginVertical:20}]}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDMEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleDarkMode}
        value={isDMEnabled}
      />
    </View>

    <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.textRegular,{color:Colors.white,backgroundColor:Colors.greyTransparent}]}>{t('language')}</Text>

    <View style={[Layout.flex,{marginVertical:20}]}>
      <Button   title={t('english')} onPress={() => i18n.changeLanguage('en')} />
      <Button   title={t('spanish')} onPress={() => i18n.changeLanguage('fr')} />
    </View>

    <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.textRegular,{color:Colors.white,backgroundColor:Colors.greyTransparent}]}>{t('cache')}</Text>

    <View style={[Layout.flex,{marginVertical:20}]}>
      <Button   title={t('clean')} onPress={cleanCache} />
    </View>
    </View>
  </>
  );
}

export default memo(SettingsComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: Colors.aliceBlue,
  },
});


