import React, {FC, memo, useEffect} from 'react';
import { Image, ScrollView, Text, View} from 'react-native';
import { useDispatch } from 'react-redux';
import ACTIONS from '../utils/actions';
import { IAgileSoftMovie, IResponseAction } from '../utils/interfaces';
import { apiRequest } from '../utils/standardActions';
import useStateSelector from '../utils/useStateSelector';
import {useTheme} from '../Theme';
import { useTranslation } from 'react-i18next';

function Detail({ navigation, route }) {
  const { movie,imageBasePath }:{movie:IAgileSoftMovie,imageBasePath:string} = route.params;
  const { Common, Fonts, Layout ,Colors} = useTheme()
  const dispatch = useDispatch()
  const navigationState:any = useStateSelector(state => state.app.currentNav );
  const isFocused = navigation.isFocused();
  const {t, i18n} = useTranslation();

  useEffect(() => {
    let name = navigationState.state.routes[navigationState.state.index].name;
    let idx = navigationState.state.index;

    if(isFocused) {
      updateActors();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationState]);

  const updateActors = () => {
    if(movie && movie.id) {
      dispatch(apiRequest(ACTIONS.GET_DETAIL,{params:{id:movie.id}}))
    }
  }

  return (
    <ScrollView>
    <View style={[Layout.fill, Layout.colCenter]}>

        {movie && (
        <>
        <Text style={[Layout.fullWidth,Fonts.titleLarge,Fonts.textCenter]}  >{`${movie.title}`}</Text>
        <Image style={[Layout.fullSize]} height={300} resizeMode={"cover"} source={{uri:imageBasePath+movie.backdrop_path}} />
        <View style={[Layout.fullWidth]} >
        <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.textRegular,{color:Colors.white,backgroundColor:Colors.greyTransparent, marginVertical:10}]}>Resumen</Text>
            <Text>{movie.overview}</Text>

            <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.textLarge,{marginVertical:10}]}>Ficha</Text>

            <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.textRegular,{color:Colors.white,backgroundColor:Colors.greyTransparent,marginVertical:10}]} >{t('original_title')}</Text>
            <Text style={[Layout.textRegular]}>{movie.original_title}</Text>

            <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.textRegular,{color:Colors.white,backgroundColor:Colors.greyTransparent,marginVertical:10}]}>{t('original_language')}</Text>
            <Text>{movie.original_language}</Text>

            <Text style={[Layout.fullWidth,Fonts.textCenter,Fonts.textRegular,{color:Colors.white,backgroundColor:Colors.greyTransparent,marginVertical:10}]}>{t('release_date')}</Text>
            <Text>{movie.release_date}</Text>


        </View>
        </>
        )

        }

    </View>
    </ScrollView>
  );
}

export default Detail;
