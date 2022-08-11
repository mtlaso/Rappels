import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_GREY,
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_RED,
  COLOR_WHITE,
} from '../../Assets/Styles/global-styles';

const ListContainer = (props: {children: React.ReactNode; style?: {}}) => {
  const numberOfLists = React.Children.count(props.children) - 1;
  return (
    <View style={styles.container}>
      {React.Children.map(props.children, (child, index) => (
        <>
          <View>{child}</View>

          {/* Doesn't work with Flatlist */}
          {index < numberOfLists && <View style={styles.separator}></View>}
        </>
      ))}
    </View>
  );
};

export default ListContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_LIGHTBLACK,
    margin: '5%',
    borderRadius: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_LIGHTERBLACK,
    alignSelf: 'flex-end',
    width: '100%',
  },
});
