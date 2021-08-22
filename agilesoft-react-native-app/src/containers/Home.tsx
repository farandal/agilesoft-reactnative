import React, {FC, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme} from '../Theme';
import useStateSelector from '../utils/useStateSelector';
import { IAgileSoftMovie, IAgileSoftMovieResults, IAgileSoftUser, IResponseAction } from 'src/utils/interfaces';
import ACTIONS from '../utils/actions';
import { apiRequest } from '../utils/standardActions';
import CustomCarousel from '../components/CustomCarousel/CustomCarousel';
import CustomPosters from '../components/CustomPosters/CustomPosters';

const Home:FC<{navigation:any}> = ({navigation}) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const theme = useStateSelector(state => state.theme);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const user:IAgileSoftUser = useStateSelector<IAgileSoftUser>(state => state.app.user );
  const action:IResponseAction = useStateSelector<IResponseAction>(state => state.app.action );
  const navigationState:any = useStateSelector(state => state.app.currentNav );

  const NOW_PLAYING:IAgileSoftMovieResults = useStateSelector<IAgileSoftMovieResults>(state => state.app.GET_NOW_PLAYING );
  const POPULAR:IAgileSoftMovieResults = useStateSelector<IAgileSoftMovieResults>(state => state.app.GET_POPULAR );

  const NOW_PLAYING_ACC:IAgileSoftMovie[] = useStateSelector<IAgileSoftMovie[]>(state => {
    if(!state.app.NOW_PLAYING_ACC) return []
    return state.app.NOW_PLAYING_ACC
  });
  const POPULAR_ACC:IAgileSoftMovie[] = useStateSelector<IAgileSoftMovie[]>(state => {
    if(!state.app.POPULAR_ACC) return []
    return state.app.POPULAR_ACC
  } );

  const [nowPlayingRetrievedPages,setNowPlayingRetrievedPages] = useState<number[]>([]);
  const [popularRetrievedPages,setPopularRetrievedPages] = useState<number[]>([]);
  const [nowPlayingCurrentPage,setNowPlayingCurrentPage] = useState<number>(1);
  const [popularPage,setPopularPage] = useState<number>(1);
 // dispatch(apiRequest(ACTIONS.GET_ME, {}));
 const isFocused = navigation.isFocused();
  useEffect(() => {
    let name = navigationState.state.routes[navigationState.state.index].name;
    let idx = navigationState.state.index;
    console.log(navigationState.state.index);
    console.log(navigationState.state);


    if(isFocused) {
      updateNowPlaying();
      updatePopular();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationState]);

  const updateNowPlaying = () => {
    if(nowPlayingRetrievedPages.includes(nowPlayingCurrentPage)) return;
    console.log(`trayendo now playing pagina ${nowPlayingCurrentPage}`);
    setNowPlayingRetrievedPages([...nowPlayingRetrievedPages,nowPlayingCurrentPage])
    dispatch(apiRequest(ACTIONS.GET_NOW_PLAYING,{query:{page:nowPlayingCurrentPage}}))
  }

  const updatePopular = () => {
    if(popularRetrievedPages.includes(popularPage)) return;
      setNowPlayingRetrievedPages([...popularRetrievedPages,popularPage])
      dispatch(apiRequest(ACTIONS.GET_POPULAR,{query:{page:popularPage}}))
  }

  const updateEventNowPlaying = (nextPage:number) => {
    console.log(`Trigger now playing page ${nextPage}`)
    setNowPlayingCurrentPage(nextPage);
  }

  const updateEventPopular = () => {
    console.log(`Trigger popular page ${popularPage+1}`)
    setPopularPage(popularPage+1);
  }

  const verDetalle = (movie:IAgileSoftMovie,imageBasePath:string) => {
    navigation.navigate('Detalle', { movie, imageBasePath  })
  }

  useEffect(() => { if(popularPage !== 1) { updatePopular() } },[popularPage])
  useEffect(() => { if(nowPlayingCurrentPage !== 1) { updateNowPlaying() } },[nowPlayingCurrentPage])

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 800;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <ScrollView

    onScroll={({nativeEvent}) => {
      if (isCloseToBottom(nativeEvent)) {
        updateEventPopular();
      }
    }}
    scrollEventThrottle={400}

    >

      {  navigationState.state.index === 0 && NOW_PLAYING_ACC && NOW_PLAYING && <CustomCarousel mode={"stretch"} updateResults={updateEventNowPlaying} imageBaseUrl={NOW_PLAYING.imageBaseUrl} onPress={verDetalle} data={NOW_PLAYING_ACC}/> }
      {  navigationState.state.index === 0 && POPULAR_ACC && POPULAR && <CustomPosters mode={"cover"} onPress={verDetalle} imageBaseUrl={POPULAR.imageBaseUrl} data={POPULAR_ACC}/> }


    </ScrollView>
  );
}

export default memo(Home);
