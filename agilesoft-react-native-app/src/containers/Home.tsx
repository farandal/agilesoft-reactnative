import React, {memo, useEffect, useState} from 'react';
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

function Home() {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const theme = useStateSelector(state => state.theme);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const user:IAgileSoftUser = useStateSelector<IAgileSoftUser>(state => state.app.user );
  const action:IResponseAction = useStateSelector<IResponseAction>(state => state.app.action );
  const navigation:any = useStateSelector(state => state.app.currentNav );

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

  useEffect(() => {
    let name = navigation.state.routes[navigation.state.index].name;
    let idx = navigation.state.index;
    console.log(navigation.state.index);
    if(idx===0) {
      updateNowPlaying();
      updatePopular();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

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

      {  navigation.state.index === 0 && NOW_PLAYING_ACC && NOW_PLAYING && <CustomCarousel mode={"stretch"} updateResults={updateEventNowPlaying} imageBaseUrl={NOW_PLAYING.imageBaseUrl} data={NOW_PLAYING_ACC}/> }
      {  navigation.state.index === 0 && POPULAR_ACC && POPULAR && <CustomPosters mode={"cover"} imageBaseUrl={POPULAR.imageBaseUrl} data={POPULAR_ACC}/> }


    </ScrollView>
  );
}

export default memo(Home);
