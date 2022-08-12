import {atom, AtomEffect} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {IList} from '../Interfaces/IList';

import {
  ALL_LISTS_LIST_ID,
  ALL_LISTS_LIST_TITLE,
  LIST_ASYNC_STORAGE_KEY,
  DATA_PERSISTENCE,
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
 * Store of all lists
 */
export const listsState = atom<IList[]>({
  key: 'listsState',
  default: [allLists, defaultList],
  effects: [
    ({onSet, trigger, setSelf}): void => {
      // Load from async storage is there is any data
      const LoadPersisted = async () => {
        // const savedValue = await getData(ASYNC_STORAGE_KEY);
        const savedValue = await DATA_PERSISTENCE.getData(
          LIST_ASYNC_STORAGE_KEY,
        );

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
        await DATA_PERSISTENCE.storeData(newValue, LIST_ASYNC_STORAGE_KEY);
      });
    },
  ],
});
