import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Button, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme} from '../Theme';
import {fetchUserAsync} from '../actions/usersActions';
import changeThemeAction from '../actions/themeActions';
import Colors from '../constants/colors';
import useSelector from '../utils/useSelector';
import { ThemeState } from 'src/reducers/themeReducer';

function Home() {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const user = useSelector(state => state.users.user);
  const theme = useSelector(state => state.theme);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  /*const fetchUser = () => {
    const userId = '1';
    dispatch(fetchUserAsync.request(userId));
  };*/

  const instructions = Platform.select({
    ios: t('iosInstruction'),
    android: t('androidInstruction'),
  });

  const changeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    console.log(theme,darkMode);
    dispatch(changeThemeAction({ theme, darkMode }))
  }

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      {/*<ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />*}
      {/*
      <Text style={styles.welcome}>{t('welcome')}</Text>
      <Text style={styles.instructions}>{t('instructions')}</Text>
      <Text style={styles.instructions}>{instructions}</Text>
      {user && <Text>user: </Text>}
      <Text>{JSON.stringify(user)}</Text>
      <Button title={t('fetchUser')} onPress={fetchUser} />*/}

      {/*
      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => changeTheme({ darkMode: null })}
      >
        <Text style={Fonts.textRegular}>Auto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Common.button.outlineRounded, Gutters.regularBMargin]}
        onPress={() => changeTheme({ darkMode: true })}
      >
        <Text style={Fonts.textRegular}>Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => changeTheme({ darkMode: false })}
      >
        <Text style={Fonts.textRegular}>Light</Text>
      </TouchableOpacity>
      */}
    </View>
  );
}

export default memo(Home);
