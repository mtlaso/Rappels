import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {COLOR_WHITE} from '../Assets/Styles/global-styles';

/**
 * Boutons pour ajouter une nouvelle liste ou une nouvelle todo
 * @param props
 * @returns
 */
const AddButtons = (props: {
  listOpenBottomSheet: () => void;
  todoOpenBottomSheet: () => void;
}) => {
  return (
    <>
      {/* Bouton 'create list' */}
      <TouchableOpacity
        onPress={e => {
          props.listOpenBottomSheet();
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Icon
          name="pluscircle"
          size={25}
          color={COLOR_WHITE}
          style={{marginRight: '2%'}}
        />
        <Text style={styles.button}>Create list</Text>
      </TouchableOpacity>

      {/* Bouton 'add task' */}
      <TouchableOpacity
        onPress={e => {
          props.todoOpenBottomSheet();
        }}>
        <Text style={styles.button}>Add todo</Text>
      </TouchableOpacity>
    </>
  );
};

export default AddButtons;

const styles = StyleSheet.create({
  button: {
    color: COLOR_WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  addIcon: {
    width: 25,
    height: 50,
    resizeMode: 'contain',
  },
});
