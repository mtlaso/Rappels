import {atom} from 'recoil';

import {ITodo} from '../Interfaces/ITodo';

/**
 * Le store de tâches
 */
export const todosState = atom<ITodo[]>({
  key: 'listTodos',
  default: [],
});
