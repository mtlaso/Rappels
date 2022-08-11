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

import {DEFAULT_LIST_ID} from '../../defaults';

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
   * @desc If mode is set to 'nothing', the delete animation is not started,
   * @desc If mode is set to 'update', the delete animation is started
   */
  updateMode: 'nothing' | 'update';
}) => {
  // List of lists (recoil js state)
  const [lists, setLists] = useRecoilState(listsState);

  // Values used to change the icon propreties when 'props.updateMode' is set to 'delete'
  const [iconName, setIconName] = useState<'bars' | 'minuscircleo'>('bars');
  const [iconColor, setIconColor] = useState<string>(COLOR_WHITE);

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
      setIconName('bars');
      setIconColor(COLOR_WHITE);
    }
  }, [props.updateMode]);

  // Delete list
  const DeleteList = (listId: string) => {
    // Make sure right mode is set
    if (props.updateMode === 'nothing') {
      return;
    }

    // Find list
    const list = lists.find(list => list.id === listId);

    // Make sure list found isn't default list
    if (list && list.id === DEFAULT_LIST_ID) {
      Alert.alert(
        'Cannot Delete List',
        'Cannot delete the default list',
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
  imgIcon: {
    width: 25,
    height: 50,
    resizeMode: 'contain',
    marginRight: '5%',
  },
});
