import {atom, AtomEffect} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {IList} from '../Interfaces/IList';

import {
  ALL_LISTS_LIST_ID,
  ALL_LISTS_LIST_TITLE,
  ASYNC_STORAGE_KEY,
  DEFAULT_LIST_ID,
  DEFAULT_LIST_TITLE,
} from '../defaults';

/**
 * All lists
 */
const allLists: IList = {
  id: ALL_LISTS_LIST_ID,
  title: ALL_LISTS_LIST_TITLE,
};

/**
 * Default list
 */
const defaultList: IList = {
  id: DEFAULT_LIST_ID,
  title: DEFAULT_LIST_TITLE,
};

/**
 * Get data from storage
 * @param {string} key storage key
 */
const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error('--> Error reading value', e);
  }
};

/**
 * Store data in storage
 * @param value Object to store
 * @param key storage key
 */
const storeData = async (value: object, key: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.error('--> Error saving value', e);
  }
};

export const listsState = atom<IList[]>({
  key: 'listsState',
  default: [allLists, defaultList],
  effects: [
    ({onSet, trigger, setSelf}): void => {
      // Load from async storage is there is any data
      const LoadPersisted = async () => {
        const savedValue = await getData(ASYNC_STORAGE_KEY);

        if (savedValue !== null) {
          setSelf(savedValue);
        }
      };

      // Asynchronously set the persisted data
      if (trigger === 'get') {
        LoadPersisted();
      }

      // Subscribe to state changes and persist them to async storage
      onSet(async (newValue, _, isReset) => {
        await storeData(newValue, '@storage_Key');
        console.log('saved data.');
      });
    },
  ],
});
