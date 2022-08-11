import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RouteProp, useRoute} from '@react-navigation/native';

import {IList} from '../Interfaces/IList';

const Test = () => {
  const route = useRoute<RouteProp<{props: {list: IList}}>>();

  const list = route.params.list;

  return (
    <View>
      <TouchableOpacity>
        <Text style={{alignItems: 'center'}}>
          Id : {list.id}, title : {list.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
