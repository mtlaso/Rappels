import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useRecoilState} from 'recoil';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
  Layout,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {IList} from '../../Interfaces/IList';

import {COLOR_RED, COLOR_WHITE} from '../../Assets/Styles/global-styles';

import {listsState} from '../../State/ListState';
import {todosState} from '../../State/TodoState';

import {ALL_LISTS_LIST_ID, DEFAULT_LIST_ID} from '../../defaults';

const List = (props: {
  /**
   * List to display
   */
  list: IList;
  /**
   * Function to navigate to the screen showing the list
   */
  navigateTo: () => void;

  /**
   * Used to know if 'Update' button is pressed on the main screen
   * @desc If mode is set to 'nothing', the delete sequence is not started,
   * @desc If mode is set to 'update', the delete sequence is started
   */
  updateMode: 'nothing' | 'update';

  /**
   * Function to set the update mode after a list is deleted
   */
  setUpdateModeAfterDelete: () => void;

  /**
   * Name of icon
   * @default - bars
   */
  icon?: string;

  /**
   * Color of icon
   * @default - white
   */
  color?: string;
}) => {
  // List of lists (recoil js state)
  const [lists, setLists] = useRecoilState(listsState);
  const [todos, setTodos] = useRecoilState(todosState);

  // List icon
  const listIcon = props.icon ?? 'bars';

  // List color
  const listColor = props.color ?? COLOR_WHITE;

  // Values used to change the icon propreties when 'props.updateMode' is set to 'delete'
  const [iconName, setIconName] = useState<typeof listIcon | 'minuscircleo'>(
    listIcon,
  );

  const [iconColor, setIconColor] = useState<typeof listColor>(listColor);

  // Offset used to animate the list (when "Update" button is pressed)
  const offset = useSharedValue(0);

  // Styles used by the Animated component
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(offset.value, {
            // damping: 10,
          }),
        },
      ],
    };
  });

  // Play delete animation when "Update" button is pressed
  useEffect(() => {
    if (props.updateMode === 'update') {
      offset.value = 12;
      setIconName('minuscircleo');
      setIconColor(COLOR_RED);
    } else {
      offset.value = 0;
      setIconName(listIcon);
      setIconColor(iconColor);
    }
  }, [props.updateMode]);

  /**
   * Delete list
   * @param listId Id of the list to delete
   */
  const DeleteList = (listId: string) => {
    // Make sure right mode is set
    if (props.updateMode === 'nothing') {
      return;
    }

    // Find list
    const list = lists.find(list => list.id === listId);

    // Make sure list exists
    if (list === undefined) {
      return;
    }

    // Make sure list found isn't "Default list" or "All" list
    if (list.id === DEFAULT_LIST_ID || list.id === ALL_LISTS_LIST_ID) {
      Alert.alert(
        'Cannot Delete List',
        'Cannot delete the "Default list" or "All list"',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
      return;
    }

    // Ask confirmation to delete list
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Delete list
            setLists(lists.filter(list => list.id !== listId));

            // Delete all todos associated with list
            setTodos(todos.filter(todo => todo.parentListId !== listId));

            // Reset update mode
            props.setUpdateModeAfterDelete();
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <Animated.View
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}
      layout={Layout.springify()}
      style={animatedStyle}>
      <TouchableOpacity
        style={styles.container}
        onPress={e => props.navigateTo()}>
        <View style={styles.firstGroup}>
          <Icon
            onPress={e => {
              DeleteList(props.list.id);
            }}
            name={iconName}
            size={25}
            color={iconColor}
            style={[styles.iconBars]}
          />
          <Text style={styles.text}>{props.list.title}</Text>
        </View>

        <View
          style={{display: props.updateMode === 'update' ? 'none' : 'flex'}}>
          <Icon
            name="rightcircle"
            size={25}
            color={COLOR_WHITE}
            style={styles.iconNext}
          />
        </View>

        {/* <Image source={require('../Images/next.png')} style={styles.imgIcon} /> */}
      </TouchableOpacity>
    </Animated.View>
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
});
