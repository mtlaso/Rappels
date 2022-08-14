import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Longeure maximale du titre d'une liste
 */
export const MAX_LENGTH_LIST_TITLE: number = 32;

/**
 * Longeure maximale du titre d'une todo
 */
export const MAX_LENGTH_TODO_TITLE: number = 32;

/**
 * Id de la liste par defaut (de DEFAULT_LIST_TITLE)
 */
export const DEFAULT_LIST_ID: string = '0';

/**
 * Titre de la liste par defaut
 */
export const DEFAULT_LIST_TITLE: string = 'Default list';

/**
 * Id of ALL_LISTS
 */
export const ALL_LISTS_LIST_ID: string = '1';

/**
 * Title of ALL_LISTS
 */
export const ALL_LISTS_LIST_TITLE: string = 'All lists';

/**
 * Lists async storage key
 */
export const LIST_ASYNC_STORAGE_KEY: string = '@storage:list';

/**
 * Todos async storage key
 */
export const TODO_ASYNC_STORAGE_KEY: string = '@storage:todo';

/**
 * Data persistence functions (load and save data)
 */
export const DATA_PERSISTENCE: {
  getData: (key: string) => Promise<any>;
  storeData: (value: object, key: string) => Promise<void>;
} = {
  /**
   * Get data from storage
   * @param {string} key storage key
   */
  getData: async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.error('--> [async-storage] - Error reading value', e);
    }
  },
  /**
   * Store data in storage
   * @param value Object to store
   * @param key storage key
   */
  storeData: async (value: object, key: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.error('--> [async-storage] - Error saving value', e);
    }
  },
};

/**
 * Font sizes
 */
export const FONT_SIZES = {
  title: 34,
  options: 16,
};
