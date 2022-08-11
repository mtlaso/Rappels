import {atom} from 'recoil';

import {IList} from '../Interfaces/IList';

import {
  ALL_LISTS_LIST_ID,
  ALL_LISTS_LIST_TITLE,
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

export const listsState = atom<IList[]>({
  key: 'listsState',
  default: [allLists, defaultList],
});
