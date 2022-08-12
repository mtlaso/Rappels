import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {useRecoilValue} from 'recoil';

import {listsState} from '../../State/ListState';

import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GREY,
  COLOR_LIGHTBLACK,
  COLOR_LIGHTERBLACK,
  COLOR_LIGHTGREY,
  COLOR_WHITE,
} from '../../Assets/Styles/global-styles';

import {IList} from '../../Interfaces/IList';

import {ALL_LISTS_LIST_ID, DEFAULT_LIST_TITLE} from '../../defaults';

const Dropdown = (props: {
  /**
   * Le placeholder du dropdown
   */
  placeholder?: string;

  /**
   * Si on peut chercher dans le dropdown
   */
  searchable?: boolean;
  /**
   * Retroune l'id de la liste sélectionnée dans le dropdown
   */
  itemChosen: (list_id: string) => void;
}) => {
  const lists = useRecoilValue(listsState);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<{label: string; value: string}[]>([]);

  // Retourner l'élèment choisi
  useEffect(() => {
    props.itemChosen(value!);
  }, [value]);

  // Charger les listes dans le dropdown
  useEffect(() => {
    // Empty state
    setItems([]);

    // Filter "All lists" from dropdown
    const filteredLists = lists.filter(list => list.id !== ALL_LISTS_LIST_ID);

    // Add lists to state "items"
    filteredLists.map(list => {
      setItems(prevItem => [...prevItem, {label: list.title, value: list.id}]);
    });
  }, [lists]);

  return (
    <>
      <DropDownPicker
        placeholder={props.placeholder ?? DEFAULT_LIST_TITLE}
        items={items}
        value={value}
        open={isOpen}
        setOpen={setIsOpen}
        setValue={setValue}
        searchable={props.searchable ?? false}
        containerStyle={{
          padding: '5%',
        }}
        style={{
          borderWidth: 0,

          backgroundColor: COLOR_LIGHTERBLACK,
        }}
        placeholderStyle={{color: COLOR_WHITE}}
        textStyle={{fontSize: 18, color: COLOR_BLACK}}
        disabledStyle={{
          opacity: 0.5,
        }}
        listMode="MODAL"
      />
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({});
