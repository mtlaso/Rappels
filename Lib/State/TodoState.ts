import {atom} from 'recoil';
import {TODO_ASYNC_STORAGE_KEY, DATA_PERSISTENCE} from '../defaults';

import {ITodo} from '../Interfaces/ITodo';

/**
 * Stores of all todos
 */
export const todosState = atom<ITodo[]>({
  key: 'listTodos',
  default: [],
  effects: [
    ({onSet, trigger, setSelf}): void => {
      // Load from async storage is there is any data
      const LoadPersisted = async () => {
        const savedValue = await DATA_PERSISTENCE.getData(
          TODO_ASYNC_STORAGE_KEY,
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
        await DATA_PERSISTENCE.storeData(newValue, TODO_ASYNC_STORAGE_KEY);
      });
    },
  ],
});
