import {ITodo} from './ITodo';

/**
 * Interface représentant une liste de tâches
 */
export interface IList {
  /**
   * Identifiant de la liste
   */
  id: string;

  /**
   * Titre de la liste
   */
  title: string;

  /**
   * Liste des tâches de la liste
   */
  todos?: ITodo[];
}
