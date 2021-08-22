import React, { FC } from 'react';
import {View, Image, Text, StyleSheet, Button} from 'react-native';
import {useTheme} from '../Theme';

interface Props {
  message: string
  height?: number
  width?: number
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
  btnText?: string
  onPress?: () => any;
}

const SystemMessage:FC<Props> = ({message,height, width, mode,btnText,onPress}) => {
  const {Layout, Images} = useTheme();

  return (
    <View style={[Layout.fullSize,styles.container]}>
      <Image style={Layout.fullSize} width={width} height={height} source={Images.logo} resizeMode={mode} />
      <Text>{message}</Text>
      {btnText && onPress &&
      <Button title={btnText} onPress={onPress ? onPress : () => {}} />
      }
    </View>
  );
};

SystemMessage.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: Colors.aliceBlue,
  }
});



export default SystemMessage;
