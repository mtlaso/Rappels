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

const Dropdown = (props: {
  /**
   * La liste des listes
   */
  items: IList[];

  /**
   * Le placeholder du dropdown
   */
  placeholder: string;

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

  const LoadItems = useCallback(() => {
    setItems(props.items.map(item => ({label: item.title, value: item.id})));
  }, [items]);

  // Charger les listes dans le dropdown
  useEffect(() => {
    LoadItems();
  }, [lists]);

  return (
    <>
      <DropDownPicker
        placeholder={props.placeholder}
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
