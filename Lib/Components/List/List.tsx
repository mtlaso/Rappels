import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {IList} from '../../Interfaces/IList';

import {COLOR_WHITE} from '../../Assets/Styles/global-styles';

const List = (props: {list: IList; navigateTo: () => void}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={e => props.navigateTo()}>
      <View style={styles.firstGroup}>
        <Icon
          name="bars"
          size={25}
          color={COLOR_WHITE}
          style={styles.iconBars}
        />
        <Text style={styles.text}>{props.list.title}</Text>
      </View>

      <Icon
        name="rightcircle"
        size={25}
        color={COLOR_WHITE}
        style={styles.iconNext}
      />
      {/* <Image source={require('../Images/next.png')} style={styles.imgIcon} /> */}
    </TouchableOpacity>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: '500',
    padding: '5%',
  },
  iconBars: {
    paddingLeft: '5%',
  },
  iconNext: {
    marginRight: '5%',
  },
  imgIcon: {
    width: 25,
    height: 50,
    resizeMode: 'contain',
    marginRight: '5%',
  },
});
