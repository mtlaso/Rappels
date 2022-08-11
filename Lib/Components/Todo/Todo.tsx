import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {ITodo} from '../../Interfaces/ITodo';

import {
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_GREY,
  COLOR_LIGHTBLACK,
  COLOR_WHITE,
} from '../../Assets/Styles/global-styles';

const Todo = (props: {
  /**
   * Todo to render
   */
  todo: ITodo;
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.firstGroup}>
        <TouchableOpacity>
          <View style={styles.circle}></View>
        </TouchableOpacity>
      </View>

      <Text style={styles.textStyle}>{props.todo.description}</Text>
      {/* <Icon
        name="rightcircle"
        size={25}
        color={COLOR_WHITE}
        style={styles.iconNext}
      /> */}
    </TouchableOpacity>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: COLOR_LIGHTBLACK,
    marginHorizontal: '5%',
    marginBottom: '4%',
    paddingBottom: '3%',
  },
  firstGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'transparent',
    width: 25,
    height: 25,
    borderRadius: 30 / 2,
    borderWidth: 3,
    borderColor: COLOR_LIGHTBLACK,
    marginRight: '5%',
  },

  textStyle: {
    color: COLOR_WHITE,
    fontSize: 18,
  },
});
