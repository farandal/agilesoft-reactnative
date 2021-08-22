import React, {memo} from 'react';
import { Text, View} from 'react-native';
import {useTheme} from '../Theme';

function Detail() {
  const { Common, Fonts, Gutters, Layout } = useTheme()


  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Text>Detail</Text>

    </View>
  );
}

export default memo(Detail);
