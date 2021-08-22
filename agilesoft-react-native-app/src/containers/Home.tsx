import React, {memo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Button, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme} from '../Theme';
import {fetchUserAsync} from '../actions/usersActions';
import changeThemeAction from '../actions/themeActions';
import Colors from '../constants/colors';
import useSelector from '../utils/useSelector';
import { ThemeState } from 'src/reducers/themeReducer';
import { IAgileSoftMovieResults, IAgileSoftUser, IRequestAction, IResponseAction } from 'src/utils/interfaces';
import ACTIONS from '../utils/actions';
import { apiRequest } from '../utils/standardActions';
import { ignoreDispatchedActions } from '../utils/utils';

function Home() {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const theme = useSelector(state => state.theme);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const user:IAgileSoftUser = useSelector<IAgileSoftUser>(state => state.app.user );
  const action:IResponseAction = useSelector<IResponseAction>(state => state.app.action );
  const navigation:any = useSelector(state => state.app.currentNav );

  const NOW_PLAYING:IAgileSoftMovieResults = useSelector<IAgileSoftUser>(state => state.app.GET_NOW_PLAYING );
  const POPULAR:IAgileSoftMovieResults = useSelector<IAgileSoftUser>(state => state.app.GET_POPULAR );

  useEffect(() => {
    console.log("HOME UPDATED");
  },[])

 // dispatch(apiRequest(ACTIONS.GET_ME, {}));

  useEffect(() => {
    let name = navigation.state.routes[navigation.state.index].name;
    let idx = navigation.state.index;
    //console.log(navigation.state.index);
    if(idx===0) {
     dispatch(apiRequest(ACTIONS.GET_NOW_PLAYING, {}));
     dispatch(apiRequest(ACTIONS.GET_POPULAR, {}));
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const changeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    console.log(theme,darkMode);
    dispatch(changeThemeAction({ theme, darkMode }))
  }

  return (
    <View style={[Layout.fill, Layout.colCenter]}>


      {  NOW_PLAYING && NOW_PLAYING.data && NOW_PLAYING.data.map(item => {
                return <Text>{item.original_title}</Text>
          })
      }

      {  POPULAR && POPULAR.data && POPULAR.data.map(item => {
                return <Text>{item.original_title}</Text>
          })
      }


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
