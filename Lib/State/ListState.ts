import {atom} from 'recoil';

import {IList} from '../Interfaces/IList';

import {DEFAULT_LIST_ID, DEFAULT_LIST_TITLE} from '../defaults';

/**
 * Le store de listes tâches
 */
const defaultList: IList = {
  id: DEFAULT_LIST_ID,
  title: DEFAULT_LIST_TITLE,
};

export const listsState = atom<IList[]>({
  key: 'listsState',
  default: [defaultList],
});
