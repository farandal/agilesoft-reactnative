import React, { FC, useEffect, useRef, useState } from 'react';
import {View, Image, Text, StyleSheet, Button, Dimensions} from 'react-native';
import {useTheme} from '../../Theme';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { IAgileSoftMovie, IAgileSoftMovieResults } from 'src/utils/interfaces';
import { animatedStyles, scrollInterpolator } from './animaciones';
import  useOrientation  from '../../utils/useOrientation';

interface ICustomSliderProps {
  data: IAgileSoftMovie[],
  imageBaseUrl:string,
  updateResults: (index:number) => any;
  height?: number;
  width?: number;
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';

  onPress?:(movie: IAgileSoftMovie,imageBasePath:string) => void;
}

const CustomCarousel:FC<ICustomSliderProps> = ({data,imageBaseUrl,updateResults,width,height,mode,onPress}) => {

  const {Layout, Images} = useTheme();
  const orientation = useOrientation();
  const PAGE_RESULTS = 20;
    const SLIDER_WIDTH = Dimensions.get('window').width;
    const ITEM_WIDTH = Math.round((width ? width : SLIDER_WIDTH) * 0.7);
    const ITEM_HEIGHT = Math.round((height ? height :ITEM_WIDTH) * 3 / 4);

    const estilos = StyleSheet.create({
      carouselContainer: {
        marginTop: 50
      },
      itemContainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'dodgerblue'
      },
      poster: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
      },
      itemLabel: {
        color: 'white',
        fontSize: 24,
        zIndex:10
      },
      counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
      }
    });

  const carouselRef = useRef<Carousel<IAgileSoftMovie>>(null);

  const [index,setIndex] = useState<number>(null);

  useEffect(() => {
    let threshold = 3;
    console.log(index,data.length);
    if(index === data.length - threshold ) {
      let nextPage = Math.round((index+threshold)/PAGE_RESULTS)+1;
      console.log(`bring next page ${nextPage}`)
        updateResults(nextPage);
    }

  },[index])

  const renderItem:FC<{item:IAgileSoftMovie}> = ({ item }) => {
    return (
      <View style={[estilos.itemContainer]}>
        <Image style={[estilos.poster]} source={{uri:`${imageBaseUrl}/${item.backdrop_path}`}} resizeMode={mode} />
        <Text style={estilos.itemLabel}>{`Item ${item.original_title}`}</Text>
      </View>
      );
    }

  return (
    <View style={[Layout.fullSize,styles.container]}>
      {data && (
          <>
      <Carousel
          ref={carouselRef}
          data={data}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={estilos.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setIndex( index )}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
        <Text style={estilos.counter}
        >
          <Button title="Detalle" onPress={onPress ? (e) => { onPress(data[index],imageBaseUrl) } : (e) => { console.log(data[index]) }} />
        </Text>
        </>
      )
      }


    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default CustomCarousel;
