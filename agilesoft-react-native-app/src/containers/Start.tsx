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
import Splash from '../components/Slash';

function Start() {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const user = useSelector(state => state.users.user);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const fetchUser = () => {
    const userId = '1';
    dispatch(fetchUserAsync.request(userId));
  };

  const instructions = Platform.select({
    ios: t('iosInstruction'),
    android: t('androidInstruction'),
  });

  const changeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeThemeAction({ theme, darkMode }))
  }

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Splash/>
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />

    </View>
  );
}

export default memo(Start);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.aliceBlue,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: Colors.darkCharcoal,
    marginBottom: 5,
  },
});
