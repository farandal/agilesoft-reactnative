import React, { FC, useEffect, useRef, useState } from 'react';
import {View, Image, Text, StyleSheet, Button, Dimensions, TouchableOpacity, GestureResponderEvent} from 'react-native';
import {useTheme} from '../../Theme';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { IAgileSoftActor, IAgileSoftMovie, IAgileSoftMovieResults } from '../../utils/interfaces';
//import { animatedStyles, scrollInterpolator } from './animaciones';
import  useOrientation  from '../../utils/useOrientation';

interface ICustomPostersProps {
  data: IAgileSoftActor[],
  imageBaseUrl:string,
  //updateResults: (index:number) => any;
  height?: number;
  width?: number;
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';

  onPress?:(movie: IAgileSoftActor,imageBasePath:string) => void;
}

const CustomPosters:FC<ICustomPostersProps> = ({data,imageBaseUrl,width,height,mode,onPress}) => {

  const {Layout, Images} = useTheme();
  const orientation = useOrientation();
  const PAGE_RESULTS = 20;

    const ITEM_WIDTH = width ? width : 110;
    const ITEM_HEIGHT = height ? height : 140;

  const estilos = StyleSheet.create({

    poster: {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
    },
    itemLabel: {
      color: 'white',
      fontSize: 24,
      //zIndex:10
    },

    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",

      //justifyContent: 'center',
      //alignItems: 'center'
      //backgroundColor: 'grey',


    },
    itemContainer: {
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      margin: 10,

      borderStyle:'solid',
      borderRadius:4,
      borderWidth:2,
      borderColor:'#555555',
      //alignItems: 'center',
      //justifyContent: 'center',
      backgroundColor: '#CCCCCC',
      //flexWrap: 'wrap',
      //display: 'flex',
      //flexWrap: 'wrap',
      //alignContent: 'flex-start',
    },
  });

  const renderItem:FC<{item:IAgileSoftActor}> = ({ item }) => {
    return (
      <TouchableOpacity onPress={onPress ? (e) => { onPress(item,imageBaseUrl) } : (e) => { console.log(item) }} style={[estilos.itemContainer]} >
        <Image style={[Layout.fullSize]} height={ITEM_HEIGHT} source={{uri:`${imageBaseUrl}${item.profile_path}`}} resizeMode={mode} />
      </TouchableOpacity>
      );
    }

  return (
    <View style={[estilos.container]}>
      {data && (
        data.map(item =>renderItem({item})
       ))
      }
    </View>
  );
};




export default CustomPosters;
